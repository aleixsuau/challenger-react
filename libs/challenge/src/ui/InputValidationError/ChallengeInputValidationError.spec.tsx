import { render } from '@testing-library/react';

import InputValidationError from './ChallengeInputValidationError';

describe('InputValidationError', () => {
  const testError = 'test error';

  it('should render successfully', () => {
    const { getByTestId } = render(<InputValidationError error={testError}/>);

    expect(getByTestId('input-validation-error')?.textContent).toBe(testError);
  });
});
