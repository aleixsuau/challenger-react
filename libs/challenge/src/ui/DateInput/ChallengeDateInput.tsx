import { Challenge, ChallengeDate } from '../../typings';
import { ChangeEvent, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import styles from './ChallengeDateInput.module.scss';
import InputValidationError from '../InputValidationError/ChallengeInputValidationError';

export interface DateInputProps {
  // TODO: type this
  name: any;
  legend: string;
  register: any;
  onChange: UseFormReturn<Challenge>['setValue'];
  trigger: any;
  validate?: (date: number) => boolean | string;
  disabled?: boolean;
  required?: boolean;
  min?: number | string;
  error?: string;
}

export function DateInput({
  name,
  legend,
  register,
  onChange,
  validate,
  required,
  min,
  disabled,
  trigger,
  error
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
  const minValue = (min ? new Date(min) : new Date()).toISOString().split('T')[0];

  return (
    <div>
      <input
        type="hidden"
        data-testid="source-input"
        {...register(name, {
          required: required && 'Date and time are required',
          validate: (date: number) => validate && validate(date),
        })}
      />
      <fieldset>
        <label className="label" htmlFor={name}>
          <span className="text-label">{legend} {required && '*'}</span>
        </label>
        <div className="flex flex-wrap gap-4">
          <input
            type="date"
            id={name}
            className="input input-md input-bordered input-secondary"
            name="date"
            value={date.date}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            aria-label="Start date"
            data-testid="input-date"
            min={minValue}
          />
          <input
            type="time"
            step="900"
            className="input input-md input-bordered input-secondary"
            name="time"
            value={date.time}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            aria-label="Start time"
            data-testid="input-time"
          />
        </div>
        <InputValidationError error={error} />
      </fieldset>
    </div>
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
