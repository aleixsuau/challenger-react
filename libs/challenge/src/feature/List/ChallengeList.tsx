import { useDialog } from '@challenger/shared/ui';
import { Challenge } from '../../typings';
import ChallengeCard from '../../ui/Card/ChallengeCard';
import ChallengeDetail from '../../ui/Detail/ChallengeDetail';
import { useChallenge } from '../Provider/ChallengeProvider';
import styles from './ChallengeList.module.scss';

export function ChallengeList() {
  const {challenges} = useChallenge();
  const { openDialog } = useDialog();

  const handleCardClick = (event: React.MouseEvent, challenge: Challenge) => {
    event.preventDefault();
    openDialog(<ChallengeDetail challenge={challenge} />);
  };

  return (
    <div className="flex flex-wrap items-center">
      {challenges?.map((challenge) => (
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
