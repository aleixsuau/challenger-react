import { Challenge } from '../../typings';
import styles from './ChallengeCard.module.scss';

/* eslint-disable-next-line */
export interface ChallengeCardProps {
  challenge: Challenge
}

function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
      data-testid="card">
      <div className="card bg-white shadow-md">
        <figure>
          <div className="h-80 w-full bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${challenge.image})` }}
            data-testid="image"
          >
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title" data-testid="title">{challenge.title}</h2>
          <p className="line-clamp-4" data-testid="description"> {challenge.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" data-testid="cta">Take!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
