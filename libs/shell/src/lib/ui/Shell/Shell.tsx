import styles from './Shell.module.scss';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';

export interface ShellConfigProps {
  title: string;
  navbar: NavBar;
  children?: React.ReactNode;
}

export interface NavBar {
  sections: NavBarSection[];
}

export interface NavBarSection {
  link: string;
  text: string;
  icon?: string;
}

export function Shell({ title, navbar, children }: ShellConfigProps) {
  return (
    <div className="leading-normal tracking-normal" data-testid="shell">
      <Header title={title}>
        <Menu navbar={navbar} />
      </Header>

      {/* Children container */}
      <div className="pt-20" data-testid="shell-container">
        {children}
      </div>
    </div>
  );
}

export default Shell;
