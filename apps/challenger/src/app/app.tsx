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
};

export function App() {
  return (
    <AuthProvider>
      <Shell
        title={shellConfigProps.title}
        navbar={shellConfigProps.navbar}
      ></Shell>
    </AuthProvider>
  );
}

export default App;
