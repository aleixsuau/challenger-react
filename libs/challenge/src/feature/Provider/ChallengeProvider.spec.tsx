import { act, render } from '@testing-library/react';
import ChallengeProvider, { useChallenge, useChallenges } from './ChallengeProvider';
import * as DDBB from '@challenger/shared/data-access/ddbb';
import { DialogProvider } from '@challenger/shared/ui';
import 'intersection-observer';
import { Challenge } from '../../typings';
import { challengesMock } from '../List/ChallengeList.spec';
import { renderHook } from '@testing-library/react'

describe('Challenge Provider', () => {
  describe('Challenges', () => {
    // TODO: These tests only fail when run with `nx affected:test`, investigate and maybe move to React Query
    // TODO: fix the error "An update to ChallengeProvider inside a test was not wrapped in act(...)"
    it('should fetch the challenges', async () => {      
      const { result } = renderHook(() => useChallenges())

      await act(async () => {
        await result.current.getChallenges({});
      })

      expect(result.current.challenges).toEqual(challengesMock);   
    });

    it('should provide the challenges', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock challenges={challengesMock} />
          </ChallengeProvider>
        </DialogProvider>
      );

      expect(queryByTestId('challenge-list').textContent).toBe(`${challengesMock.length}`);
    });
  });

  describe('Create', () => {
    it('should show/hide the challenge form', async () => {
      const { queryByTestId, findByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(() => queryByTestId('challenge-create-button')?.click());

      const form = await findByTestId('challenge-form');

      expect(form).toBeTruthy();

      await act(async () => await queryByTestId('challenge-form-cancel')?.click());

      expect(queryByTestId('challenge-form')).toBeFalsy();
    });

    it('should save the challenge on form submission', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-create-button')?.click());
      await act(async () => await queryByTestId('challenge-form-submit')?.click());

      expect(DDBB.setDocument).toHaveBeenCalled();
    });

    it('should close the challenge on form submission', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-create-button')?.click());
      await act(async () => await queryByTestId('challenge-form-submit')?.click());

      expect(queryByTestId('challenge-form')).toBeFalsy();
    });
  });

  describe('Edit', () => {
    it('should show/hide the challenge form', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-edit-button')?.click());

      expect(queryByTestId('challenge-form')).toBeTruthy();

      await act(async () => await queryByTestId('challenge-form-cancel')?.click());

      expect(queryByTestId('challenge-form')).toBeFalsy();
    });

    it('should pass the challenge data to the form', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-edit-button')?.click());

      expect(queryByTestId('challenge-form')).toBeTruthy();
      expect(queryByTestId('form-title').value).toBe(challengesMock[0].title);
    });

    it('should save the challenge on form submission', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-edit-button')?.click());
      await act(async () => await queryByTestId('challenge-form-submit')?.click());

      expect(DDBB.setDocument).toHaveBeenCalled();
    });

    it('should close the challenge on form submission', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-edit-button')?.click());
      await act(async () => await queryByTestId('challenge-form-submit')?.click());

      expect(queryByTestId('challenge-form')).toBeFalsy();
    });
  });

  describe('Show', () => {
    it('should show the challenge detail', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeProviderConsumerMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-show-button')?.click());

      expect(queryByTestId('challenge-detail')).toBeTruthy();
      expect(queryByTestId('challenge-detail-hero').textContent).toBe(challengesMock[0].title);
    });
  });
});

jest.mock('../Form/ChallengeForm', () => {
  return {
    __esModule: true,
    default: ({ onSubmit, onCancel, challenge }: any) => {
      return <div data-testid="challenge-form">
        <input data-testid="form-title" value={challenge?.title} readOnly />
        <button onClick={onSubmit} data-testid="challenge-form-submit">Save Challenge</button>
        <button onClick={onCancel} data-testid="challenge-form-cancel">Close Challenge</button>
      </div>;
    },
  };
});

jest.mock('@challenger/shared/data-access/ddbb', () => ({
  setDocument: jest.fn(() => Promise.resolve()),
  queryDocuments: jest.fn(() => {
    return Promise.resolve([
      {
        id: '1',
        title: 'Challenge 1',
        description: 'Description 1',
        image: 'https://picsum.photos/200/300',
        date: {
          start: {
            time: 1676039465229,
            timezone: 'America/Sao_Paulo',
          },
          end: {
            time: 1676039465229,
            timezone: 'America/Sao_Paulo',
          },
        },
        milestones: [],
      },
      {
        id: '2',
        title: 'Challenge 2',
        description: 'Description 2',
        image: 'https://picsum.photos/200/300',
        date: {
          start: {
            time: 1676039465229,
            timezone: 'America/Sao_Paulo',
          },
          end: {
            time: 1676039465229,
            timezone: 'America/Sao_Paulo',
          },
        },
        milestones: [],
      },
    ])
  }),
}));


const ChallengeProviderConsumerMock = ({ challenges }: { challenges?: Challenge[] }) => {
  const { createChallenge, editChallenge, showChallenge } = useChallenge();
  return <>
    <div data-testid="challenge-list">{challenges?.length}</div>
    <button onClick={createChallenge} data-testid="challenge-create-button">Create challenge</button>
    <button onClick={() => editChallenge(challengesMock[0])} data-testid="challenge-edit-button">Edit challenge</button>
    <button onClick={() => showChallenge(challengesMock[0])} data-testid="challenge-show-button">Show challenge</button>
  </>;
};
