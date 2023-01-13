import styles from './MenuToggle.module.scss';

/* eslint-disable-next-line */
export interface MenuToggleProps {
  onToggle: () => void;
}

export function MenuToggle({ onToggle }: MenuToggleProps) {
  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggle();
  };

  return (
    <div className="block pr-4 lg:hidden" data-testid="menu-toggle">
      <button
        id="nav-toggle"
        className="focus:shadow-outline flex transform items-center p-1 text-black transition duration-300 ease-in-out hover:scale-105 hover:text-gray-900 focus:outline-none"
        onClick={(e) => handleToggleClick(e)}
        data-testid="menu-toggle-button"
      >
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div >
  );
}

export default MenuToggle;
