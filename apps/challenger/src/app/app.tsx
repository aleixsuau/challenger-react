// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthProvider } from '@challenger/shared/auth';
import { ChallengeList, ChallengeProvider } from '@challenger/challenge';
import { Shell, ShellConfigProps } from '@challenger/shell';
import styles from './app.module.scss';
import { DialogProvider } from '@challenger/shared/ui';

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
      <DialogProvider>
        <ChallengeProvider>
          <Shell
            title={shellConfigProps.title}
            navbar={shellConfigProps.navbar}
          >
            <ChallengeList />
          </Shell>
        </ChallengeProvider>
      </DialogProvider>
    </AuthProvider>
  );
}

export default App;
