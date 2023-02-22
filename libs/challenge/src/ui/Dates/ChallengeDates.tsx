import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { ChallengeDate } from '../../typings';
import styles from './ChallengeDates.module.scss';
import dayjs from 'dayjs';

export const Dates = ({ start, end }: ChallengeDatesProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="badge badge-outline p-3"
        data-testid="milestone-date-start"
      >
        <CalendarIcon className={`mr-2 h-4 w-4`} />
        {formatDate(start?.time)}
      </span>
      {end?.time && (
        <>
          <ArrowRightIcon className={`h-4 w-4`} />
          <span
            className="badge badge-outline p-3"
            data-testid="milestone-date-end"
          >
            <CalendarIcon className={`mr-2 h-4 w-4`} />
            {formatDate(end?.time)}
          </span>
        </>
      )}
    </div>
  );
};

export default Dates;

export interface ChallengeDatesProps {
  start?: ChallengeDate;
  end?: ChallengeDate;
}

const formatDate = (date?: number): string => {
  if (!date) return '';

  return dayjs(date).format('YYYY-MM-DD HH:mm');

  /* const dateObj = new Date(date);
  console.log('dateObj', dateObj)

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }); */
};
