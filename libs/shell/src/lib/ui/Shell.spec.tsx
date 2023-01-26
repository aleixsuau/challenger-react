import { render } from '@testing-library/react';
import Shell, { ShellConfigProps } from './Shell';
import '@testing-library/jest-dom';

jest.mock('@challenger/auth', () => {
  const useAuth = jest.fn(() => {
    return {
      user: {},
      loginWithGoogle: jest.fn(),
      logout: jest.fn(),
    };
  });

  return {
    useAuth,
  };
});

const shellConfigProps: ShellConfigProps = {
  title: 'challenger',
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
      <Shell
        title={shellConfigProps.title}
        navbar={shellConfigProps.navbar}
      >
        <div data-testid="children-content"></div>
      </Shell>
    );

    expect(getByTestId('header')).toBeTruthy();
    expect(getByTestId('brand')).toBeTruthy();
    expect(getByTestId('navbar-toggle')).toBeTruthy();
    expect(
      document.querySelector('[data-testid=navbar].vertical')
    ).toBeTruthy();
    expect(
      document.querySelector('[data-testid=navbar].horizontal')
    ).toBeTruthy();
    expect(getByTestId('user-menu')).toBeTruthy();
    expect(getByTestId('shell-container')).toBeTruthy();
  });

  it('should display children content', () => {
    const { getByTestId } = render(
      <Shell
        title={shellConfigProps.title}
        navbar={shellConfigProps.navbar}
      >
        <div data-testid="children-content"></div>
      </Shell>
    );

    expect(getByTestId('children-content')).toBeTruthy();
  });
});
