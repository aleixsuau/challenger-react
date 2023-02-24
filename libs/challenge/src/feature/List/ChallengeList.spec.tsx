import { render } from '@testing-library/react';
import ChallengeList from './ChallengeList';
import * as Challenge from '../Provider/ChallengeProvider';
export const challengesMock = [
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
];
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




