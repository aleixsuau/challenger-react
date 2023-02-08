import { useAuth } from '@challenger/shared/auth';
import { useChallenge } from '../Provider/ChallengeProvider';
import styles from './ChallengeCreateButton.module.scss';


/* eslint-disable-next-line */
export interface ChallengeCreateButtonProps {}

export function ChallengeCreateButton(props: ChallengeCreateButtonProps) {
  const auth = useAuth();
  const challenge = useChallenge();

  return (
    auth.user &&
    <button className="btn btn-circle btn-primary border-2 text-2xl" title="Create challenge" onClick={challenge.create} data-testid="challenge-create-button">+</button>
  );
}

export default ChallengeCreateButton;
