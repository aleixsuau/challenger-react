import { Challenge } from '../../typings';
import ChallengeCard from '../../ui/Card/ChallengeCard';
import { useChallenge } from '../Provider/ChallengeProvider';
import styles from './ChallengeList.module.scss';

export function ChallengeList() {
  const { challenges, showChallenge, editChallenge } = useChallenge();

  const handleCardClick = (event: React.MouseEvent, challenge: Challenge) => {
    event.stopPropagation();
    showChallenge(challenge);
  };

  const handleCardEdit = (challenge: Challenge) => {
    editChallenge(challenge);
  };

  return (
    <div className="flex flex-wrap items-center">
      {challenges?.map((challenge) => (
        <ChallengeCard
          challenge={challenge}
          key={challenge.id}
          onClick={(event) => handleCardClick(event, challenge)}
          onEdit={() => handleCardEdit(challenge)}
        />
      ))}
    </div>
  );
}

export default ChallengeList;
