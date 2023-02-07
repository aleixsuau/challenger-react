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
    <>
      <input
        type="hidden"
        data-testid="source-input"
        {...register(name, {
          required: required && 'Date and time are required',
          validate: (date: number) => validate && validate(date),
        })}
      />
      <fieldset>
        <legend className="input-label">
          {legend} {required && '*'}
        </legend>
        <div className="flex flex-wrap gap-4">
          <label>
            <input
              type="date"
              className="input"
              name="date"
              value={date.date}
              disabled={disabled}
              required={required}
              onChange={handleChange}
              aria-label="Start date"
              data-testid="input-date"
              min={minValue}
            />
          </label>
          <label>
            <input
              type="time"
              step="900"
              className="input"
              name="time"
              value={date.time}
              disabled={disabled}
              required={required}
              onChange={handleChange}
              aria-label="Start time"
              data-testid="input-time"
            />
          </label>
        </div>        
        <div className="basis-full">
          <InputValidationError error={error} />
        </div>
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
