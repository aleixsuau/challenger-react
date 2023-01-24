import { act, render } from '@testing-library/react';
import UserMenu, { UserMenuConfig } from './UserMenu';
import '@testing-library/jest-dom';

const mockedUser = {
  displayName: 'mockedUser',
  photoURL: 'mockedPhoto',
  email: '',
};
jest.mock('@cocinista/auth', () => {
  const useAuth = jest.fn(() => {
    return {
      user: mockedUser,
      loginWithGoogle: jest.fn(),
      logout: jest.fn(),
    };
  });

  return {
    useAuth,
  };
});

describe('UserMenu', () => {
  const userMenu: UserMenuConfig = {
    sections: [
      {
        text: 'settings',
        link: 'settings',
        icon: 'settings',
      },
      {
        text: 'signout',
        link: 'signout',
        icon: 'signout',
      },
    ],
  };

  describe('Toggle button', () => {
    it('should display the user name and picture', () => {
      const { getByTestId } = render(<UserMenu sections={userMenu.sections} />);
      const toggle = getByTestId('toggle');
      const toggleText = toggle.textContent;
      const toggleImg = toggle.querySelector('img')?.getAttribute('src');

      expect(toggleText).toContain(mockedUser.displayName);
      expect(toggleImg).toBe(mockedUser.photoURL);
    });

    it('should render the toggle button', () => {
      const { getByTestId } = render(<UserMenu sections={userMenu.sections} />);
      const toggle = getByTestId('toggle');

      expect(toggle).toBeTruthy();
    });

    it('should toggle the user dropdown', () => {
      const { getByTestId, queryByTestId } = render(
        <UserMenu sections={userMenu.sections} />
      );
      const toggle = getByTestId('toggle');

      act(() => toggle.click());

      expect(getByTestId('dropdown')).toBeVisible();

      act(() => toggle.click());

      expect(queryByTestId('dropdown')).not.toBeInTheDocument();
    });
  });

  describe('Dropdown', () => {
    it('should diaplay the user`s email', () => {
      const { getByTestId } = render(<UserMenu sections={userMenu.sections} />);
      const toggle = getByTestId('toggle');

      act(() => toggle.click());

      expect(getByTestId('dropdown')?.querySelector('div')?.textContent).toBe(
        mockedUser.email
      );
    });

    it('should show one item per section in the user dropdown', () => {
      const { getByTestId } = render(<UserMenu sections={userMenu.sections} />);
      const toggle = getByTestId('toggle');

      act(() => toggle.click());

      const dropdownItems = getByTestId('dropdown')?.querySelectorAll('a');

      dropdownItems?.forEach((item, index) => {
        expect(item.textContent).toBe(userMenu.sections[index].text);
        expect(item.getAttribute('href')).toBe(userMenu.sections[index].link);
      });
    });
  });
});
