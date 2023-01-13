import { render } from '@testing-library/react';
import MenuItem from './MenuItem';
import '@testing-library/jest-dom';


describe.only('MenuItem', () => {
  const section = {
    text: 'recipes',
    link: 'recipe',
    icon: 'recipe',
  };

  it('should render core elements', () => {
    const { getByTestId } = render(<MenuItem section={section} isOpen={false} />);

    expect(getByTestId('menu-item')).toBeDefined();
    expect(getByTestId('menu-item-link')).toHaveAttribute('href', section.link);
    expect(getByTestId('menu-item-link').textContent).toBe(section.text);
  });

  it('should display the `isOpen` styles', () => {
    const { getByTestId } = render(<MenuItem section={section} isOpen={true} />);

    expect(getByTestId('menu-item')).toHaveClass('border-b-2');
  });
});
