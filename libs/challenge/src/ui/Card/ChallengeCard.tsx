import { MouseEventHandler } from 'react';
import { Challenge } from '../../typings';
import styles from './ChallengeCard.module.scss';

/* eslint-disable-next-line */
export interface ChallengeCardProps {
  challenge: Challenge;
  onClick: MouseEventHandler<HTMLDivElement>;
}

function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  return (
    <div
      className="w-full cursor-pointer p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
      onClick={onClick}
      data-testid="card"
    >
      <div className="card bg-white shadow-md">
        <figure>
          <div
            className="h-80 w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${challenge.image})` }}
            data-testid="image"
          ></div>
        </figure>
        <div className="card-body">
          <h2 className="card-title" data-testid="title">
            {challenge.title}
          </h2>
          <p className="text-neutral line-clamp-4" data-testid="description">
            {' '}
            {challenge.description}
          </p>
          <div className="card-actions justify-end pt-2">
            <button className="btn btn-primary" data-testid="cta">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
