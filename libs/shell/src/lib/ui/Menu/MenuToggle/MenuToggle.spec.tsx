import { render } from '@testing-library/react';
import MenuToggle from './MenuToggle';
import '@testing-library/jest-dom';

describe('MenuToggle', () => {
  it('should be hidden on lg screen', () => {
    const { getByTestId } = render(<MenuToggle onToggle={() => null} />);

    expect(getByTestId('menu-toggle')).toHaveClass('lg:hidden');
  });

  it('should call the onToggle callback', () => {
    const onToggle = jest.fn();
    const { getByTestId } = render(<MenuToggle onToggle={() => onToggle()} />);

    getByTestId('menu-toggle-button').click();

    expect(onToggle).toHaveBeenCalled();
  });
});

