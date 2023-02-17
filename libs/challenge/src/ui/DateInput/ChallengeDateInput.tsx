import { Challenge, ChallengeDate } from '../../typings';
import { UseFormReturn } from 'react-hook-form';
import styles from './ChallengeDateInput.module.scss';
import InputValidationError from '../InputValidationError/ChallengeInputValidationError';
import { DatePicker } from 'antd';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

export interface DateInputProps {
  // TODO: type this
  name: any;
  legend: string;
  value?: ChallengeDate;
  register: any;
  onChange: UseFormReturn<Challenge>['setValue'];
  trigger: any;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  error?: string;
}

export function DateInput({
  name,
  legend,
  value,
  register,
  onChange,
  required,
  min = dayjs().valueOf(),
  max,
  disabled,
  trigger,
  error,
}: DateInputProps) {
  const defaultValue = value ? dayjs.tz(value?.time, value?.timezone) : null;
  const minDayjs = dayjs(min);
  const maxDayjs = dayjs(max);
  const isDisabled = (date: dayjs.Dayjs) => !date || !!(min && date.endOf('day').isBefore(minDayjs)) || !!(max && date.startOf('day').isAfter(maxDayjs));
  const validate = {
    isAfter: (date: ChallengeDate) => min ? dayjs(date.time).isAfter(minDayjs, 'minutes') ? true : `Date has to be after ${minDayjs.format('YYYY-MM-DD HH:mm')}` : true,
    isBefore: (date: ChallengeDate) => max ? dayjs(date.time).isSameOrBefore(maxDayjs, 'minutes') ? true : `Date has to be before ${maxDayjs.format('YYYY-MM-DD HH:mm')}` : true,
  };
  const handleChange = (date: dayjs.Dayjs | null) => {
    onChange(name, formatDate(date));
    trigger(name);
  };

  return (
    <>
      <input
        type="hidden"
        data-testid="source-input"
        {...register(name, {
          required: required && 'Date and time are required',
          validate,
        })}
      />
      <fieldset className="basis-64 shrink-0 grow-0">
        <label className="label" htmlFor={name}>
          <span className="text-label">
            {legend} {required && '*'}
          </span>
        </label>
        <div className="flex flex-wrap">
          <DatePicker
            showTime
            disabledDate={isDisabled}
            value={defaultValue}
            onChange={handleChange}
            placeholder={legend}
            minuteStep={15}
            format="YYYY-MM-DD HH:mm"
            className="input input-md input-bordered input-secondary text-secondary [&.ant-picker-focused]:outline-secondary shadow-none hover:border-transparent [&.ant-picker-focused]:outline [&.ant-picker-focused]:outline-2 [&.ant-picker-focused]:outline-offset-2"
          />
        </div>
        <InputValidationError error={error} />
      </fieldset>
    </>
  );
}

export default DateInput;

const formatDate = (date: dayjs.Dayjs | null): ChallengeDate | null => {
  if (!date) {
    return null;
  }

  const time = date.valueOf();
  const timezone = dayjs.tz.guess();
  const dateToSet = { time, timezone };

  return dateToSet;
};
