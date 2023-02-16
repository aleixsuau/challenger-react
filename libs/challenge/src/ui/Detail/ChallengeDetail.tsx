import { useState } from 'react';
import { Challenge } from '../../typings';
import styles from './ChallengeDetail.module.scss';
import ChallengeMilestone from '../Milestone/ChallengeMilestone';

/* eslint-disable-next-line */
export interface ChallengeDetailProps {
  challenge: Challenge;
}

export function ChallengeDetail({ challenge }: ChallengeDetailProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="max-h-[80vh]">
      <div
        className="hero h-80 w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${challenge.image})` }}
        data-testid="challenge-hero"
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className={`text-5xl font-bold text-white`}>
              {challenge.title}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 p-6">
        <div
          className="text-neutral text-center"
          data-testid="challenge-description"
        >
          <p
            className={showFullDescription ? 'line-clamp-none' : 'line-clamp-2'}
          >
            {challenge.description}
          </p>
          <span
            className="cursor-pointer underline"
            onClick={() => setShowFullDescription(!showFullDescription)}
            data-testid="challenge-read-more-button"
          >
            Read {showFullDescription ? 'less' : 'more'}
          </span>
        </div>
        {challenge.milestones.map((milestone, index) => (
          <ChallengeMilestone key={index} milestone={milestone} />
        ))}
      </div>
    </div>
  );
}

export default ChallengeDetail;