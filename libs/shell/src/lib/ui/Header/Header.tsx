import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const isScrolledListener = () => setIsScrolled(window.pageYOffset > 100);

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", isScrolledListener);
    }

    return () => window.removeEventListener("scroll", isScrolledListener);
  }, []);

  return (
    <header
      id="header"
      className={`sticky top-0 z-30 w-full bg-neutral-content duration-300 ease-in ${isScrolled ? "shadow-sm" : ""}`}
      data-testid="header"
    >
      <div className="container mx-auto px-4 flex w-full flex-wrap items-center py-3 gap-4">
        {children}
      </div>
    </header>
  );
}

export default Header;
