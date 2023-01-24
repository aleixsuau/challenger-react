import styles from './UserMenu.module.scss';
import { useAuth } from '@challenger/auth';
import { Menu } from '@headlessui/react';
import { Section } from '@challenger/shell';

/* eslint-disable-next-line */
export interface UserMenuConfig {
  sections: Section[];
}

export interface NavBarConfig {
  sections: Section[];
}

export function UserMenu({ sections }: UserMenuConfig) {
  const user = useAuth()?.user;

  return (
    <Menu as="div" className="relative ml-auto" data-testid="user-menu">
      {({ open }) => (
        <>
          <Menu.Button
            data-testid="toggle"
            className={`flex items-center rounded-full text-sm font-medium text-gray-500 outline-none hover:text-gray-900 hover:ring-4 hover:ring-gray-100 focus:ring-4 focus:ring-gray-100 md:mr-0 ${open ? 'ring-4 ring-gray-100' : ''
              }`}
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <svg
              className="mx-1.5 h-4 w-4"
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
            <span className="truncate">{user?.displayName}</span>
            {user?.photoURL ? (
              <img
                className="ml-3 h-8 w-8 rounded-full ring-4 ring-gray-100"
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
            className="absolute right-0 z-30 mt-2 w-44 divide-y divide-gray-100 rounded bg-white text-sm shadow-md outline-none"
          >
            <div className="px-4 py-3">
              <div className="truncate font-medium italic">{user?.email}</div>
            </div>
            {sections?.map((section) => (
              <Menu.Item key={section.link}>
                {({ active }) => (
                  <a
                    href={section.link}
                    className={`block px-4 py-2 capitalize ${active ? 'bg-gray-100' : ''
                      }`}
                  >
                    {section.text}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export default UserMenu;
