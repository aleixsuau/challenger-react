import { useState } from 'react';
import styles from './Shell.module.scss';
import Header from './Header/Header';
import NavBar, { NavBarConfig } from './NavBar/NavBar';
import UserMenu from './UserMenu/UserMenu';
import NavBarToggle from './NavBar/NavBarToggle/NavBarToggle';
import Brand from './Brand/Brand';
import { ChallengeCreateButton } from '@challenger/challenge';

export interface ShellConfigProps {
  title: string;
  navbar: NavBarConfig;
  children?: React.ReactNode;
}

export interface Section {
  link: string;
  text: string;
  icon?: string;
}

export function Shell({ title, navbar, children }: ShellConfigProps) {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const handleNavbarToggle = () => setNavbarIsOpen((isOpen) => !isOpen);

  return (
    <div className="leading-normal tracking-normal" data-testid="shell">
      <Header>
        <NavBarToggle onToggle={handleNavbarToggle} />
        <Brand title={title} />
        <NavBar sections={navbar.sections} />
        <ChallengeCreateButton />
        <UserMenu />
        <NavBar
          sections={navbar.sections}
          isOpen={navbarIsOpen}
          vertical={true}
        />
      </Header>

      <main className="pt-20" data-testid="shell-container">
        {children}
      </main>
    </div>
  );
}

export default Shell;
