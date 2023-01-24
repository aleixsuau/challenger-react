import { NavBarItem } from './NavBarItem/NavBarItem';
import styles from './NavBar.module.scss';
import { Section } from '@cocinista/shell';

export interface NavBarConfig {
  sections: Section[];
}

interface NavBarProps {
  sections: Section[];
  vertical?: boolean;
  isOpen?: boolean;
}

export function NavBar({
  sections,
  vertical = false,
  isOpen = false,
}: NavBarProps) {
  const baseNavBarClassNames = `mt-2 w-full flex-grow bg-white p-4 text-black`;
  const verticalNavBarClassNames = `relative z-20 ${
    isOpen ? 'block' : 'hidden'
  } lg:hidden vertical`;
  const horizontalNavBarClassNames = `hidden lg:mt-0 lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0 horizontal`;
  const resultNavBarClassNames = `${baseNavBarClassNames} ${
    vertical ? verticalNavBarClassNames : horizontalNavBarClassNames
  }`;
  const listClassNames = `list-reset ${
    vertical ? 'absolute w-full left-0' : 'flex flex-1 items-center justify-end'
  }`;

  return (
    <nav className={resultNavBarClassNames} data-testid="navbar">
      <ul className={listClassNames} data-testid="navbar-list">
        {sections.map((section) => (
          <NavBarItem
            section={section}
            vertical={vertical}
            key={section.link}
          />
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
