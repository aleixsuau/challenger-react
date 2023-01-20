import styles from './Header.module.scss';
import logo from './cocinista.png';

export interface HeaderProps {
  title: string,
  children: React.ReactNode
}

export function Header({ title, children }: HeaderProps) {
  return (
    <nav id="header" className="fixed top-0 z-30 w-full text-white" data-testid="header">
      <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between py-2">
        {/* Logo */}
        <a
          className="flex items-center pl-4 uppercase text-2xl font-bold text-black no-underline hover:no-underline lg:text-4xl"
          href="/"
        >
          <img src={logo} alt="Cocinista Logo" className="h-10 w-10" data-testid="logo" />
          <p className="pl-4" data-testid='title'>{title}</p>
        </a>
        {children}
      </div>
    </nav>
  );
}

export default Header;
