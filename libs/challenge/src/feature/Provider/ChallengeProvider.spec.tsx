import { act, render } from '@testing-library/react';
import ChallengeProvider, { useChallenge } from './ChallengeProvider';
import * as DDBB from '@challenger/shared/data-access/ddbb';
import { DialogProvider } from '@challenger/shared/ui';
import 'intersection-observer';

describe('Challenge Provider', () => {
  describe('Create', () => {
    it('should show/hide the challenge form', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeCreateButtonMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-create-button')?.click());

      expect(queryByTestId('challenge-form')).toBeTruthy();

      await act(async () => await queryByTestId('challenge-form-cancel')?.click());

      expect(queryByTestId('challenge-form')).toBeFalsy();
    });

    it('should save the challenge on form submission', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengeCreateButtonMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('challenge-create-button')?.click());
      await act(async () => await queryByTestId('challenge-form-submit')?.click());

      expect(DDBB.addDocument).toHaveBeenCalled();
    });
  });

  describe('Get', () => {
    it('should get challenges', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <ChallengeProvider>
            <ChallengesGetButtonMock />
          </ChallengeProvider>
        </DialogProvider>
      );

      await act(async () => await queryByTestId('get-challenges-button')?.click());

      expect(DDBB.queryDocuments).toHaveBeenCalled();
    });
  });
});

jest.mock('../Form/ChallengeForm', () => {
  return {
    __esModule: true,
    default: ({ onSubmit, onCancel }: any) => {
      return <div data-testid="challenge-form">
        <button onClick={onSubmit} data-testid="challenge-form-submit">Save Challenge</button>
        <button onClick={onCancel} data-testid="challenge-form-cancel">Close Challenge</button>
      </div>;
    },
  };
});

jest.mock('@challenger/shared/data-access/ddbb', () => ({
  addDocument: jest.fn(() => Promise.resolve()),
  queryDocuments: jest.fn(() => Promise.resolve()),
}));

const ChallengeCreateButtonMock = () => {
  const challenge = useChallenge();
  return <button onClick={challenge.create} data-testid="challenge-create-button">Create challenge</button>;
};

const ChallengesGetButtonMock = () => {
  const challenge = useChallenge();
  return <button data-testid="get-challenges-button" onClick={() => challenge.get()}>Get challenges</button>;
};
