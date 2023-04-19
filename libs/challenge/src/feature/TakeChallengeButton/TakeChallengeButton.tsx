import { useState } from 'react';
import { Challenge } from '../../typings';
import { useChallenge } from '../Provider/ChallengeProvider';
import styles from './TakeChallengeButton.module.scss';

export interface TakeChallengeButtonProps {
  challenge: Challenge;
}

export function TakeChallengeButton({ challenge }: TakeChallengeButtonProps) {
  const {canTakeChallenge, takeChallenge} = useChallenge();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    takeChallenge(challenge.id).finally(() => setIsLoading(false));
  }
  
  return (
    canTakeChallenge(challenge.id) ?
      <button 
        className="btn btn-primary text-xl w-60"
        disabled={isLoading}
        onClick={handleClick}
        data-testid="take-challenge-button">
        Take Challenge
      </button> :
      null
  );
}

export default TakeChallengeButton;
