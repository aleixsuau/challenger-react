import { Challenge, ChallengeDate } from '../../typings';
import { ChangeEvent, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import styles from './ChallengeDateInput.module.scss';

/* eslint-disable-next-line */
export interface DateInputProps {
  // TODO: type this
  name: any;
  legend: string;
  register: any;
  onChange: UseFormReturn<Challenge>['setValue'];
  required?: boolean;
  trigger: any;
}

export function DateInput({
  name,
  legend,
  register,
  onChange,
  required,
  trigger,
}: DateInputProps) {
  const [date, setDate] = useState({
    date: '',
    time: '',
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const update = {
      ...date,
      [target?.name]: target.value,
    };

    setDate(update);

    if (update.date && update.time) {
      const dateToEmit = formatDate(update);

      onChange(name, dateToEmit);
    } else {
      onChange(name, null);
    }

    trigger(name);
  };

  return (
    <>
      <input
        type="hidden"
        data-testid="source-input"
        {...register(name, {
          required: required && 'Date and time are required',
        })}
      />
      <fieldset className="flex flex-wrap gap-4">
        <legend>
          {legend} {required && '*'}
        </legend>
        <label>
          <input
            type="date"
            className="input"
            name="date"
            value={date.date}
            required={required}
            onChange={handleChange}
            aria-label="Start date"
            data-testid="input-date"
          />
        </label>
        <label>
          <input
            type="time"
            step="900"
            className="input"
            name="time"
            value={date.time}
            required={required}
            onChange={handleChange}
            aria-label="Start time"
            data-testid="input-time"
          />
        </label>
      </fieldset>
    </>
  );
}

export default DateInput;

const formatDate = (update: { date: string; time: string }): ChallengeDate => {
  const parsedDate = Date.parse(`${update.date}T${update.time || '00:00'}`);
  const time = new Date(parsedDate).getTime();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateToSet = { time, timezone };

  return dateToSet;
};
