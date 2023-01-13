import { NavBarSection } from '../../Shell/Shell';
import styles from './MenuItem.module.scss';

/* eslint-disable-next-line */
export interface MenuItemProps {
  section: NavBarSection,
  isOpen: boolean;
}

export function MenuItem({ section, isOpen }: MenuItemProps) {
  return (
    <li className={`mr-3 ${isOpen ? 'border-b-2 border-gray-100' : ''}`}
      key={section.link}
      data-testid="menu-item">
      <a
        className="inline-block py-2 px-4 text-xl uppercase text-black no-underline hover:text-gray-800 hover:underline hover:decoration-4"
        href={section.link}
        data-testid="menu-item-link"
      >
        {section.text}
      </a>
    </li>
  );
}

export default MenuItem;
