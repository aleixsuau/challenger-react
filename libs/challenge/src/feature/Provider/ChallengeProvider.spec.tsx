import { act, render } from '@testing-library/react';
import ChallengeProvider, { useChallenge } from './ChallengeProvider';
import * as DDBB from '@challenger/shared/data-access/ddbb';

jest.mock('../../ui/Form/ChallengeForm', () => {
  return {
    __esModule: true,
    default: ({ show, onSave, onClose }: any) => {
      return show && <div data-testid="challenge-form">
        <button onClick={onSave} data-testid="challenge-form-submit">Save Challenge</button>
        <button onClick={onClose} data-testid="challenge-form-cancel">Close Challenge</button>
      </div>;
    },
  };
});

jest.mock('@challenger/shared/data-access/ddbb', () =>  ({
    addDocument: jest.fn(() => Promise.resolve()),
}));

const ChallengeCreateButtonMock = () => {
  const challenge = useChallenge();
  return <button onClick={challenge.create} data-testid="create-challenge-button">Create Challenge</button>;
};

describe('Challenge Provider', () => {
  describe('Challenge creation', () => {
    it('should toggle the challenge form', () => {
      const { queryByTestId } = render(
        <ChallengeProvider>
          <ChallengeCreateButtonMock />
        </ChallengeProvider>
      );

      expect(queryByTestId('challenge-form')).toBeFalsy();

      act(() => queryByTestId('create-challenge-button')?.click());

      expect(queryByTestId('challenge-form')).toBeTruthy();

      act(() => queryByTestId('challenge-form-cancel')?.click());

      expect(queryByTestId('challenge-form')).toBeFalsy();
    });

    it('should save the challenge', () => {
      const { queryByTestId } = render(
        <ChallengeProvider>
          <ChallengeCreateButtonMock />
        </ChallengeProvider>
      );

      act(() => queryByTestId('create-challenge-button')?.click());
      act(() => queryByTestId('challenge-form-submit')?.click());

      expect(DDBB.addDocument).toHaveBeenCalled();
    });
  });
});
