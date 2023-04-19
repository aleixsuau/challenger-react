import { act, render } from '@testing-library/react';
import { challengesMock } from '../../mocks.spec';
import TakeChallengeButton from './TakeChallengeButton';
import * as Challenge from '../Provider/ChallengeProvider';
import '@testing-library/jest-dom';

describe('TakeChallengeButton', () => {
  const canTakeChallenge = jest.fn(() => true);
  const takeChallenge = jest.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));

  beforeEach(() => {
    jest.spyOn(Challenge, 'useChallenge').mockReturnValue({ takeChallenge, canTakeChallenge } as any);
  });

  describe('UI', () => {
    it('should show the button when the user can take challenges', () => {
      const { queryByTestId } = render(<TakeChallengeButton challenge={challengesMock[0]} />);

      expect(queryByTestId('take-challenge-button')).toBeTruthy();
    });

    it('should not show the button when the user can not take challenges', () => {
      const canTakeChallenge = jest.fn(() => false);
      jest.spyOn(Challenge, 'useChallenge').mockReturnValue({ canTakeChallenge } as any);

      const { queryByTestId } = render(<TakeChallengeButton challenge={challengesMock[0]} />);

      expect(queryByTestId('take-challenge-button')).toBeFalsy();
    });
  });

  describe('Take Challenge', () => {
    it('should take the challenge when clicked', () => {
      const { queryByTestId } = render(<TakeChallengeButton challenge={challengesMock[0]} />);

      act(() => queryByTestId('take-challenge-button')?.click());

      expect(takeChallenge).toHaveBeenCalled();
    });

    it('should disable the button while taking the challenge', () => {
      const { queryByTestId } = render(<TakeChallengeButton challenge={challengesMock[0]} />);

      act(() => queryByTestId('take-challenge-button')?.click());

      expect(queryByTestId('take-challenge-button')).toBeDisabled();
    });
  });
});
