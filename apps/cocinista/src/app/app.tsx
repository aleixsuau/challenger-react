// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Shell, ShellConfigProps } from '@cocinista/shell';
import styles from './app.module.scss';

const shellConfigProps: ShellConfigProps = {
  title: 'cocinista',
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
    <Shell title={shellConfigProps.title} navbar={shellConfigProps.navbar}>
    </Shell>
  );
}

export default App;
