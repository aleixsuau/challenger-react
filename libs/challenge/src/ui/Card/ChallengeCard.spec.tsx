import { render } from '@testing-library/react';
import { challengesMock } from '../../feature/List/ChallengeList.spec';
import ChallengeCard from './ChallengeCard';
import '@testing-library/jest-dom';

describe('Card', () => {
  describe('UI', () => {
    it('should display the correct elements', () => {
      const { queryByTestId } = render(<ChallengeCard challenge={challengesMock[0]} />);

      expect(queryByTestId('challenge-card')).toBeTruthy();
      expect(queryByTestId('challenge-card-image')).toHaveStyle(`background-image: url(${challengesMock[0].image})`)
      expect(queryByTestId('challenge-card-title').textContent).toContain(challengesMock[0].title);
      expect(queryByTestId('challenge-card-description').textContent).toContain(challengesMock[0].description);
      expect(queryByTestId('challenge-card-read-more-cta')).toBeTruthy();
    });
  });

  describe('onClick', () => {
    it('should trigger the onClick callback', () => {
      const onClickFn = jest.fn();
      const { queryByTestId } = render(<ChallengeCard challenge={challengesMock[0]} onClick={onClickFn} />);

      queryByTestId('challenge-card').click();

      expect(onClickFn).toHaveBeenCalled();
    });
  });

  describe('onEdit', () => {
    it('should show the onEdit button only if onEdit callback present', () => {
      const { queryByTestId, rerender } = render(<ChallengeCard challenge={challengesMock[0]} />);

      expect(queryByTestId('challenge-card-edit-cta')).toBeFalsy();

      rerender(<ChallengeCard challenge={challengesMock[0]} onEdit={() => null} />);

      expect(queryByTestId('challenge-card-edit-cta')).toBeTruthy();
    });

    it('should trigger the onEdit callback', () => {
      const onEditFn = jest.fn();
      const { queryByTestId } = render(<ChallengeCard challenge={challengesMock[0]} onEdit={onEditFn} />);

      queryByTestId('challenge-card-edit-cta').click();

      expect(onEditFn).toHaveBeenCalled();
    });
  });
});
