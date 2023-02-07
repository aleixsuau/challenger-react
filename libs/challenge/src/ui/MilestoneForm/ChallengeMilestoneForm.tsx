import { Challenge } from '../../typings';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import styles from './ChallengeMilestoneForm.module.scss';
import DateInput from '../DateInput/ChallengeDateInput';
import FileInput from '../FileInput/ChallengeFileInput';
import InputValidationError from '../InputValidationError/ChallengeInputValidationError';

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
      className="bg-primary-background flex flex-col gap-8 rounded-sm p-4"
    >
      <label>        
        <span className="input-label">Title *</span>
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
        <InputValidationError error={errors.milestones?.[index]?.title?.message} />
      </label>      
      <label>
        <span className="input-label">Description *</span>
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
        <InputValidationError error={errors.milestones?.[index]?.description?.message} />
      </label>      
      <label>
        <span className="input-label">Meeting URL *</span>
        <input
          type="url"
          key={milestone.id}
          {...register(`milestones.${index}.location.url`, {
            required: 'This field is required',
          })}
          className="input"
        />
        <InputValidationError error={errors.milestones?.[index]?.location?.url?.message} />
      </label>      
      <div className="flex flex-wrap gap-8">
        <div>
          <DateInput
            name={`milestones[${index}].date.start`}
            legend="Starts"
            onChange={onChange}
            register={register}
            required={true}
            trigger={trigger}
            error={errors?.milestones?.[index]?.date?.start?.message}
          />
        </div>
        <div>
          <DateInput
            name={`milestones[${index}].date.end`}
            legend="Ends"
            onChange={onChange}
            register={register}
            required={true}
            trigger={trigger}
            error={errors?.milestones?.[index]?.date?.end?.message}
          />
        </div>
      </div>      
      
      <FileInput
        name={`milestones.${index}.image`}
        label="Image"
        register={register}
        onChange={onChange}
        required={true}
        trigger={trigger}
        error={errors?.milestones?.[index]?.image?.message}
      />
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
