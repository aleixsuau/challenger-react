import { NavBar } from '@cocinista/shell';
import { MenuToggle } from './MenuToggle/MenuToggle';
import { useState } from 'react';
import styles from './Menu.module.scss';
import MenuItem from 'libs/shell/src/lib/ui/Menu/MenuItem/MenuItem';

export function Menu({ navbar }: { navbar: NavBar }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MenuToggle onToggle={() => setIsOpen(isOpen => !isOpen)} />
      <div
        className={`z-20 mt-2 w-full ${isOpen ? '' : 'hidden'} flex-grow bg-white p-4 text-black lg:mt-0 lg:flex lg:w-auto lg:items-center lg:bg-transparent lg:p-0`}
        id="nav-content"
        data-testid="menu"
      >
        {/* Menu sections */}
        <ul className="list-reset flex-1 items-center justify-end lg:flex" data-testid="menu-list">
          {
            navbar.sections.map(section => <MenuItem section={section} isOpen={isOpen} key={section.link} />)
          }
        </ul>

        {/* Menu login */}
        <button
          id="login"
          className="focus:shadow-outline mx-auto mt-4 text-xl transform rounded-full bg-white py-4 px-8 font-bold text-gray-800 opacity-75 shadow transition duration-300 ease-in-out hover:scale-105 hover:underline focus:outline-none lg:mx-0 lg:mt-0"
          data-testid="menu-login-button"
        >
          LOGIN
        </button>
      </div>
    </>
  );
}

export default Menu;
