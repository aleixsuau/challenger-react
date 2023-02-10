import { render } from '@testing-library/react';
import { challengesMock } from '../../feature/List/ChallengeList.spec';
import ChallengeCard from './ChallengeCard';
import '@testing-library/jest-dom';

describe('Card', () => {
  it('should display the correct UI elements', () => {    
    const { queryByTestId } = render(<ChallengeCard challenge={challengesMock[0]}/>);

    expect(queryByTestId('card')).toBeTruthy();
    expect(queryByTestId('image')).toHaveStyle(`background-image: url(${challengesMock[0].image})`)
    expect(queryByTestId('title').textContent).toContain(challengesMock[0].title);
    expect(queryByTestId('description').textContent).toContain(challengesMock[0].description);
    expect(queryByTestId('cta')).toBeTruthy();
  });
});
