// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthProvider } from '@challenger/auth';
import { Shell, ShellConfigProps } from '@challenger/shell';
import styles from './app.module.scss';

const shellConfigProps: ShellConfigProps = {
  title: 'challenger',
  navbar: {
    sections: [
      {
        text: 'recipes',
        link: 'recipe',
        icon: 'recipe',
      },
      {
        text: 'contact',
        link: 'contact',
        icon: 'contact',
      },
    ],
  },
  userMenu: {
    sections: [
      {
        text: 'settings',
        link: 'settings',
        icon: 'settings',
      },
      {
        text: 'signout',
        link: 'signout',
        icon: 'signout',
      },
    ],
  },
};

export function App() {
  return (
    <AuthProvider>
      <Shell
        title={shellConfigProps.title}
        navbar={shellConfigProps.navbar}
        userMenu={shellConfigProps.userMenu}
      ></Shell>
    </AuthProvider>
  );
}

export default App;
