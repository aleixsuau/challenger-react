import { render } from '@testing-library/react';
import Shell, { ShellConfigProps } from './Shell';

const shellConfigProps: ShellConfigProps = {
  title: 'cocinista',
  navbar: {
    sections: [
      {
        text: 'recipes',
        link: 'recipe',
        icon: 'recipe',
      },
      {
        text: 'contact',
        link: 'contact',
        icon: 'contact',
      },
    ],
  },
};

describe('Shell', () => {
  it('should display the core elements', () => {
    const { getByTestId } = render(
      <Shell title={shellConfigProps.title} navbar={shellConfigProps.navbar}>
        <div data-testid="children-content"></div>
      </Shell>
    );

    expect(getByTestId('header')).toBeTruthy();
    expect(getByTestId('menu')).toBeTruthy();
    expect(getByTestId('shell-container')).toBeTruthy();
  });

  it('should display children content', () => {
    const { getByTestId } = render(
      <Shell title={shellConfigProps.title} navbar={shellConfigProps.navbar}>
        <div data-testid="children-content"></div>
      </Shell>
    );

    expect(getByTestId('children-content')).toBeTruthy();
  });
});
