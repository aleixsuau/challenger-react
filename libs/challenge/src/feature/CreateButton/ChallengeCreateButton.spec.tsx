
import { act, render } from '@testing-library/react';
import ChallengeCreateButton from './ChallengeCreateButton';
import * as Auth from '@challenger/shared/auth';
import * as Challenge from '../Provider/ChallengeProvider';

describe('ChallengeCreateButton', () => {
  const createChallenge = jest.fn();

  beforeEach(() => {
    jest.spyOn(Auth, 'useAuth').mockReturnValue({ user: null } as any);
    jest.spyOn(Challenge, 'useChallenge').mockReturnValue({ createChallenge } as any);
  });

  it('should be hidden by default', () => {
    const { queryByTestId } = render(<ChallengeCreateButton />);

    expect(queryByTestId('challenge-create-button')).toBeFalsy();
  });

  describe('Authenticated users', () => {
    beforeEach(() => {
      jest.spyOn(Auth, 'useAuth').mockReturnValue({ user: {} } as any);
    });

    it('should render', () => {
      const { queryByTestId } = render(<ChallengeCreateButton />);

      expect(queryByTestId('challenge-create-button')).toBeTruthy();
    });

    it('should `create a challenge` when clicked', () => {
      const { queryByTestId } = render(<ChallengeCreateButton />);

      act(() => queryByTestId('challenge-create-button')?.click());

      expect(createChallenge).toHaveBeenCalled();
    });
  });
});
