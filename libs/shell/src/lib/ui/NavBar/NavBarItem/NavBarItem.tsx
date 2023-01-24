import { Section } from '../../Shell/Shell';
import styles from './NavBarItem.module.scss';

/* eslint-disable-next-line */
export interface NavBarItemProps {
  section: Section;
  vertical: boolean;
}

export function NavBarItem({ section, vertical }: NavBarItemProps) {
  return (
    <li
      className={`mr-3 ${vertical ? 'border-b-2 border-gray-100' : ''}`}
      key={section.link}
      data-testid="navbar-item"
    >
      <a
        className="inline-block py-2 px-4 text-xl uppercase text-black no-underline hover:text-gray-800 hover:underline hover:decoration-4"
        href={section.link}
        data-testid="navbar-item-link"
      >
        {section.text}
      </a>
    </li>
  );
}

export default NavBarItem;
