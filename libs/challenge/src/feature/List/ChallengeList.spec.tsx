import { render } from '@testing-library/react';
import ChallengeList from './ChallengeList';
import * as Challenge from '../Provider/ChallengeProvider';
import { challengesMock } from '../../mocks.spec';

jest.mock('../../ui/Card/ChallengeCard', () => () => <div data-testid="challenge-card" />);

describe('List', () => {
  beforeEach(() => {
    jest.spyOn(Challenge, 'useChallenge').mockReturnValue({challenges: challengesMock} as any);
  });

  describe('UI', () => {
    it('should display one card per challenge', async () => {
      const { findAllByTestId, debug } = render(<ChallengeList />);
      const cards = await findAllByTestId('challenge-card');

      expect(cards.length).toEqual(challengesMock.length);
    });
  });
});




