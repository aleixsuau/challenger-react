import { render } from '@testing-library/react';
import ChallengeMilestone from './ChallengeMilestone';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { mockedChallenge } from '../Detail/ChallengeDetail.spec';

describe('Milestone', () => {
  describe('UI', () => {
    describe('collapsed', () => {
      it('should display the correct elements', () => {
        const { getByTestId } = render(
          <ChallengeMilestone milestone={milestoneMock} />
        );

        expect(getByTestId('milestone-image')).toHaveStyle({
          'background-image': `url(${milestoneMock.image})`,
        });
        expect(getByTestId('milestone-title')?.textContent).toBe(
          milestoneMock.title
        );
      });
    });

    describe('uncollapsed', () => {
      it('should display the correct elements', () => {
        const { getByTestId } = render(
          <ChallengeMilestone milestone={milestoneMock} />
        );

        act(() => getByTestId('milestone-collapsible-button')?.click());

        expect(getByTestId('milestone-image')).toHaveStyle({
          'background-image': `url(${milestoneMock.image})`,
        });
        expect(getByTestId('milestone-title')?.textContent).toBe(
          milestoneMock.title
        );
        expect(getByTestId('milestone-date-start')?.textContent).toBe(
          '2023-02-14 01:15'
        );
        expect(getByTestId('milestone-date-end')?.textContent).toBe(
          '2023-02-15 01:30'
        );
        expect(getByTestId('milestone-location')?.textContent).toBe(
          milestoneMock.location.url
        );
        expect(getByTestId('milestone-location')).toHaveAttribute(
          'href',
          milestoneMock.location.url
        );
        expect(getByTestId('milestone-description')?.textContent).toBe(
          milestoneMock.description
        );
      });
    });
  });
});

const milestoneMock = mockedChallenge.milestones[0];
