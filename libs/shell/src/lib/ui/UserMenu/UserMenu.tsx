import styles from './UserMenu.module.scss';
import { useAuth } from '@challenger/shared/auth';
import { Menu } from '@headlessui/react';
import { Section } from '@challenger/shell';

/* eslint-disable-next-line */
export interface UserMenuConfig {
  sections: Section[];
}

export interface NavBarConfig {
  sections: Section[];
}

export function UserMenu() {
  const { user, loginWithGoogle, logout } = useAuth();

  return user ? (
    <Menu
      as="div"
      className="relative basis-50"
      data-testid="user-menu"
    >
      {({ open }) => (
        <>
          <Menu.Button
            data-testid="toggle"
            className={`btn btn-primary ${open ? 'bg-primary-focus' : ''}`}
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <svg
              className="mr-2 h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="truncate hidden md:block">{user?.displayName}</span>
            {user?.photoURL ? (
              <img
                className="ring-primary-content ml-3 h-8 w-8 rounded-full ring-2"
                src={user?.photoURL}
                alt="user profile"
              />
            ) : (
              <svg
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{' '}
                  <path
                    opacity="0.4"
                    d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{' '}
                </g>
              </svg>
            )}
          </Menu.Button>

          <Menu.Items
            data-testid="dropdown"
            className="text-primary absolute left-0 z-30 mt-2 w-48 divide-y divide-gray-100 rounded bg-white text-sm shadow-md outline-none"
          >
            <div className="px-4 py-3">
              <div className="truncate font-medium italic">{user?.email}</div>
            </div>
            <Menu.Item>
              {({ active }) => (
                <span
                  className={`block cursor-pointer px-4 py-2 capitalize ${
                    active ? 'bg-gray-100' : ''
                  }`}
                  onClick={logout}
                >
                  Sign out
                </span>
              )}
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  ) : (
    <button
      data-testid="toggle"
      className="btn btn-secondary basis-44"
      type="button"
      onClick={loginWithGoogle}
    >
      START
    </button>
  );
}

export default UserMenu;
