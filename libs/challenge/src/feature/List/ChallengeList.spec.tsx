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
]

describe('List', () => {
  const showChallenge = jest.fn();
  const editChallenge = jest.fn();

  beforeEach(() => {
    jest.spyOn(Challenge, 'useChallenge').mockReturnValue(
      { 
        challenges: challengesMock,
        showChallenge,
        editChallenge,
      } as any);
  });

  describe('UI', () => {
    it('should display one card per challenge', () => {
      const { findAllByTestId } = render(<ChallengeList />);

      findAllByTestId('challenge-card').then((cards: HTMLElement[]) => {
        expect(cards.length).toEqual(challengesMock.length);
      });
    });
  });

  describe('Show challenge', () => {
    it('should show the challenge on card click', () => {
      const { queryAllByTestId } = render(<ChallengeList />);

      queryAllByTestId('challenge-card')[0]?.click();

      expect(showChallenge).toHaveBeenCalled();
    });
  });

  describe('Edit challenge', () => {
    it('should edit the challenge on card`s edit button click', () => {
      const { queryAllByTestId } = render(<ChallengeList />);

      queryAllByTestId('challenge-card-edit-cta')[0]?.click();

      expect(editChallenge).toHaveBeenCalled();
    });
  });
});
