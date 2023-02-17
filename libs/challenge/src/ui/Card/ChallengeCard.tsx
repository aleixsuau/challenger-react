import { EyeIcon, PencilIcon } from '@heroicons/react/20/solid';
import { MouseEventHandler } from 'react';
import { Challenge } from '../../typings';
import styles from './ChallengeCard.module.scss';

/* eslint-disable-next-line */
export interface ChallengeCardProps {
  challenge: Challenge;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onEdit?: () => void;
}

function ChallengeCard({ challenge, onClick, onEdit }: ChallengeCardProps) {
  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit && onEdit();
  };

  return (
    <div
      className="w-full cursor-pointer p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
      onClick={onClick}
      data-testid="challenge-card"
    >
      <div className="card bg-white shadow-md">
        <figure>
          <div
            className="h-80 w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${challenge.image})` }}
            data-testid="challenge-card-image"
          ></div>
        </figure>
        <div className="card-body">
          <h2 className="card-title" data-testid="challenge-card-title">
            {challenge.title}
          </h2>
          <p className="text-neutral line-clamp-4" data-testid="challenge-card-description">
            {' '}
            {challenge.description}
          </p>
          <div className="card-actions justify-end pt-2">
            {onEdit && (
              <button className="btn btn-sm btn-secondary" data-testid="challenge-card-edit-cta" onClick={handleEdit}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </button>
            )}
            <button className="btn btn-sm btn-secondary" data-testid="challenge-card-read-more-cta">
              <EyeIcon className="h-4 w-4 mr-2" />
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
