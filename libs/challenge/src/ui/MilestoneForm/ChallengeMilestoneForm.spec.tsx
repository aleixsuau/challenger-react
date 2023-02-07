import { render } from '@testing-library/react';

import MilestoneForm from './ChallengeMilestoneForm';

describe('MilestoneForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MilestoneForm />);
    expect(baseElement).toBeTruthy();
  });
});
