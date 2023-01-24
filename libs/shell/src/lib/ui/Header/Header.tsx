import styles from './Header.module.scss';

export interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header
      id="header"
      className="fixed top-0 z-30 w-full text-black"
      data-testid="header"
    >
      <div className="container mx-auto mt-0 flex w-full flex-wrap items-center py-2">
        {children}
      </div>
    </header>
  );
}

export default Header;
