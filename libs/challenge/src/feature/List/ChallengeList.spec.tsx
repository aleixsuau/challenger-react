import { act, findAllByTestId, render } from '@testing-library/react';
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
  const getChallengesFn = jest.fn(() => Promise.resolve(challengesMock));

  beforeEach(() => {
    jest.spyOn(Challenge, 'useChallenge').mockReturnValue({ get: getChallengesFn } as any);
  });

  it('should fetch challenges in the first render', async () => {
    await act(async () => render(<ChallengeList />));

    expect(getChallengesFn).toHaveBeenCalled();
  });

  it('should display one card per challenge', async () => {
    let testUtils;

    await act(async () => {testUtils = render(<ChallengeList />)});

    testUtils!.findAllByTestId('card').then((cards: HTMLElement[]) => {
      expect(cards.length).toEqual(challengesMock.length);
    }); 
  });
});
