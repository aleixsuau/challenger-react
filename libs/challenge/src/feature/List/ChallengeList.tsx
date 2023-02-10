import { useEffect, useState } from 'react';
import { Challenge } from '../../typings';
import ChallengeCard from '../../ui/Card/ChallengeCard';
import { useChallenge } from '../Provider/ChallengeProvider';
import styles from './ChallengeList.module.scss';

export function ChallengeList() {
  const challenge = useChallenge();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    challenge.get().then((challengesData) => setChallenges(challengesData));
  }, []);

  return (
    <div className="flex flex-wrap items-center">
      {challenges.map(challenge => <ChallengeCard challenge={challenge} key={challenge.id} />)}
    </div>
  );
}

export default ChallengeList;


