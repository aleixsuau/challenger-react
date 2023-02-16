import { useDialog } from '@challenger/shared/ui';
import { useEffect, useState } from 'react';
import { Challenge } from '../../typings';
import ChallengeCard from '../../ui/Card/ChallengeCard';
import ChallengeDetail from '../../ui/Detail/ChallengeDetail';
import { useChallenge } from '../Provider/ChallengeProvider';
import styles from './ChallengeList.module.scss';

export function ChallengeList() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const challenge = useChallenge();
  const dialog = useDialog();

  useEffect(() => {
    challenge.get().then((challengesData) => setChallenges(challengesData));
  }, []);

  const handleCardClick = (event: React.MouseEvent, challenge: Challenge) => {
    event.preventDefault();
    dialog.open(<ChallengeDetail challenge={challenge} />);
  };

  return (
    <div className="flex flex-wrap items-center">
      {challenges.map((challenge) => (
        <ChallengeCard
          challenge={challenge}
          key={challenge.id}
          onClick={(event) => handleCardClick(event, challenge)}
        />
      ))}
    </div>
  );
}

export default ChallengeList;
