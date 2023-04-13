import { render } from '@testing-library/react';
import ChallengeCard from './ChallengeCard';
import '@testing-library/jest-dom';
import * as Challenge from '../../feature/Provider/ChallengeProvider';
import { challengesMock } from '../../feature/List/ChallengeList.spec';

describe('Card', () => {
  const showChallenge = jest.fn();
  const editChallenge = jest.fn();
  const canEditChallenge = jest.fn(() => true);

  beforeEach(() => {
    jest.spyOn(Challenge, 'useChallenge').mockReturnValue(
      {
        challenges: challengesMock,
        showChallenge,
        editChallenge,
        canEditChallenge,
      } as any);
  });

  describe('UI', () => {
    it('should display the correct elements', () => {
      const { queryByTestId } = render(<ChallengeCard challenge={challengesMock[0]} />);

      expect(queryByTestId('challenge-card')).toBeTruthy();
      expect(queryByTestId('challenge-card-image')).toHaveStyle(`background-image: url(${challengesMock[0].image})`)
      expect(queryByTestId('challenge-card-title')?.textContent).toContain(challengesMock[0].title);
      expect(queryByTestId('milestone-dates')).not.toBeNull();
      expect(queryByTestId('challenge-card-description')?.textContent).toContain(challengesMock[0].description);
      expect(queryByTestId('challenge-card-read-more-cta')).toBeTruthy();
    });
  });

  describe('Show challenge', () => {
    it('should show the challenge on card click', () => {
      const { queryByTestId } = render(<ChallengeCard challenge={challengesMock[0]} />);

      queryByTestId('challenge-card')?.click();

      expect(showChallenge).toHaveBeenCalled();
    });
  });

  describe('Edit challenge', () => {
    it('should show the edit button only to if user canEdit (challenge host)', () => {
      jest.spyOn(Challenge, 'useChallenge').mockReturnValue({ canEditChallenge: jest.fn(() => false)} as any);

      const { queryByTestId, rerender } = render(<ChallengeCard challenge={challengesMock[0]} />);
      
      expect(queryByTestId('challenge-card-edit-cta')).toBeFalsy();

      jest.spyOn(Challenge, 'useChallenge').mockReturnValue({ canEditChallenge: jest.fn(() => true) } as any);

      rerender(<ChallengeCard challenge={challengesMock[0]} />);

      expect(queryByTestId('challenge-card-edit-cta')).toBeTruthy();
    });

    it('should edit the challenge when the edit button is clicked', () => {
      const { queryByTestId } = render(<ChallengeCard challenge={challengesMock[0]} />);

      queryByTestId('challenge-card-edit-cta')?.click();

      expect(editChallenge).toHaveBeenCalled();
    });
  });
});

