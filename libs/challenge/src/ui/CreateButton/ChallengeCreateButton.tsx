import { useAuth } from '@challenger/shared/auth';
import { useChallenge } from '../../feature/Provider/ChallengeProvider';
import styles from './ChallengeCreateButton.module.scss';


/* eslint-disable-next-line */
export interface ChallengeCreateButtonProps {}

export function ChallengeCreateButton(props: ChallengeCreateButtonProps) {
  const auth = useAuth();
  const challenge = useChallenge();

  return (
    auth.user &&
    <button className="button accent round-full" onClick={challenge.create} data-testid="challenge-create-button">+</button>
  );
}

export default ChallengeCreateButton;
