import { render } from '@testing-library/react';
import ChallengeDetail from './ChallengeDetail';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { challengeMock } from '../../mocks.spec';

describe('Detail', () => {
  describe('UI', () => {
    it('should display the correct elements', async () => {
      const { getByTestId, getAllByTestId } = render(
        <ChallengeDetail challenge={challengeMock} />
      );

      expect(getByTestId('challenge-detail-hero')).toHaveStyle({
        'background-image': `url(${challengeMock.image})`,
      });
      expect(getByTestId('challenge-detail-hero')?.textContent).toBe(
        challengeMock.title
      );
      expect(getByTestId('challenge-detail-description')?.textContent).not.toBe(
        challengeMock.description
      );

      await act(() =>
        getByTestId('challenge-detail-read-more-button')?.click()
      );

      expect(getByTestId('challenge-detail-description')?.textContent).toBe(
        challengeMock.description + 'Read less'
      );

      expect(getAllByTestId('milestone').length).toBe(
        challengeMock.milestones.length
      );
    });
  });

  describe('Read more', () => {
    it('should expand/shrink the description', async () => {
      const { getByTestId } = render(
        <ChallengeDetail challenge={challengeMock} />
      );

      expect(getByTestId('challenge-detail-description')?.textContent).not.toBe(
        challengeMock.description
      );

      await act(() =>
        getByTestId('challenge-detail-read-more-button')?.click()
      );

      expect(getByTestId('challenge-detail-description')?.textContent).toBe(
        challengeMock.description + 'Read less'
      );
    });
  });
});
