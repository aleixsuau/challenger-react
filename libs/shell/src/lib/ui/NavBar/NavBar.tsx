import { NavBarItem } from './NavBarItem/NavBarItem';
import styles from './NavBar.module.scss';
import { Section } from '@challenger/shell';

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
  const baseNavBarClassNames = `navbar`;
  const verticalNavBarClassNames = `${isOpen ? 'block' : 'hidden'
    } lg:hidden vertical`;
  const horizontalNavBarClassNames = `hidden lg:flex lg:w-auto`;
  const resultNavBarClassNames = `${baseNavBarClassNames} ${vertical ? verticalNavBarClassNames : horizontalNavBarClassNames
    }`;
  const listClassNames = `flex w-full ${vertical ? 'menu' : 'menu menu-horizontal'}`;

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
