import { Challenge } from '../../typings';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import styles from './ChallengeMilestoneForm.module.scss';
import DateInput from '../DateInput/ChallengeDateInput';
import FileInput from '../FileInput/ChallengeFileInput';

/* eslint-disable-next-line */
// TODO: add types
export interface MilestoneFormProps {
  index: number;
  milestone: FieldArrayWithId<Challenge>;
  register: any;
  onChange: UseFormReturn<Challenge>['setValue'];
  onDelete: () => void;
  errors: any;
  trigger: any;
}

export function MilestoneForm({ index, milestone, register, onChange, onDelete, trigger, errors }: MilestoneFormProps) {
  return (
    <div
      key={milestone.id}
      className="bg-primary-background flex flex-col gap-4 rounded-sm p-4"
    >
      <label>
        <span>Title</span>
        <input
          key={milestone.id}
          {...register(`milestones.${index}.title`, {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'Minimum length is 3',
            },
            maxLength: {
              value: 25,
              message: 'Maximum length is 25',
            },
          })}
          className="input"
        />
      </label>
      <p className="text-error pt-2 text-sm">
        {errors.milestones?.[index]?.title?.message}
      </p>
      <label>
        <span>Description</span>
        <input
          key={milestone.id}
          {...register(`milestones.${index}.description`, {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'Minimum length is 3',
            },
            maxLength: {
              value: 250,
              message: 'Maximum length is 25',
            },
          })}
          className="input"
        />
      </label>
      <p className="text-error pt-2 text-sm">
        {errors.milestones?.[index]?.description?.message}
      </p>
      <label>
        <span>Meeting URL</span>
        <input
          type="url"
          key={milestone.id}
          {...register(`milestones.${index}.location.url`, {
            required: 'This field is required',
          })}
          className="input"
        />
      </label>
      <p className="text-error pt-2 text-sm">
        {errors.milestones?.[index]?.location?.url?.message}
      </p>
      <div className="flex flex-wrap gap-8">
        <div>
          <DateInput
            name={`milestones[${index}].date.start`}
            legend="Starts"
            onChange={onChange}
            register={register}
            required={true}
            trigger={trigger}
          />
          <p className="text-error text-sm">
            {errors?.milestones?.[index]?.date?.start?.message}
          </p>
        </div>
        <div>
          <DateInput
            name={`milestones[${index}].date.end`}
            legend="Ends"
            onChange={onChange}
            register={register}
            required={true}
            trigger={trigger}
          />
          <p className="text-error text-sm">
            {errors?.milestones?.[index]?.date?.end?.message}
          </p>
        </div>
      </div>      
      
      <FileInput
        name={`milestones.${index}.image`}
        label="Image"
        register={register}
        onChange={onChange}
        required={true}
        trigger={trigger}
      />
      <p className="text-error text-sm">
        {errors?.milestones?.[index]?.image?.message}
      </p>
      <div className="flex content-start gap-4">
        <button
          type="button"
          className="button"
          onClick={() => onDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MilestoneForm;
