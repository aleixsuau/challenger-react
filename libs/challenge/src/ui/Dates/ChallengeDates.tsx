import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import { ChallengeDate } from '../../typings';
import styles from './ChallengeDates.module.scss';
import dayjs from 'dayjs';

export const ChallengeDates = ({ start, end, short }: ChallengeDatesProps) => {
  console.log('start, end', start, end)
  return (
    <div className="flex flex-wrap items-center gap-2" data-testid="milestone-dates">
      <span
        className={`badge badge-outline p-3 ${short ? 'text-xs text-neutral' : ''}`}
        data-testid="milestone-date-start"
      >
        <CalendarIcon className={`mr-2 ${short ? 'h-3 w-3' : 'h-4 w-4'}`} />
        {formatDate(start?.time)}h
      </span>
      {!short && end?.time && (
        <>
          <ArrowRightIcon className={`h-4 w-4`} />
          <span
            className={`badge badge-outline p-3 ${short ? 'text-xs' : ''}`}
            data-testid="milestone-date-end"
          >
            <CalendarIcon className={`mr-2 ${short ? 'h-3 w-3' : 'h-4 w-4'}`} />
            {formatDate(end?.time)}h
          </span>
        </>
      )}
    </div>
  );
};

export default ChallengeDates;

export interface ChallengeDatesProps {
  start?: ChallengeDate;
  end?: ChallengeDate;
  short?: boolean;
}

const formatDate = (date?: number): string => {
  if (!date) return '';

  return dayjs(date).format('YYYY/MM/DD - HH:mm');
};
