import { Section } from '../../Shell';
import styles from './NavBarItem.module.scss';

/* eslint-disable-next-line */
export interface NavBarItemProps {
  section: Section;
  vertical: boolean;
}

export function NavBarItem({ section, vertical }: NavBarItemProps) {
  return (
    <li
      className={`text-base uppercase font-medium hover:font-semibold ${vertical ? 'w-full border-gray-100' : ''}`}
      key={section.link}
      data-testid="navbar-item"
    >
      <a
        href={section.link}
        data-testid="navbar-item-link"
      >
        {section.text}
      </a>
    </li>
  );
}

export default NavBarItem;
