import { Challenge } from '../../typings';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import styles from './ChallengeMilestoneForm.module.scss';
import DateInput from '../../ui/DateInput/ChallengeDateInput';
import FileInput from '../../ui/FileInput/ChallengeFileInput';
import InputValidationError from '../../ui/InputValidationError/ChallengeInputValidationError';


/* eslint-disable-next-line */
// TODO: add types
export interface MilestoneFormProps {
  index: number;
  milestone: FieldArrayWithId<Challenge>;
  register: any;
  onChange: UseFormReturn<Challenge>['setValue'];
  onDelete: () => void;
  getValues: UseFormReturn<Challenge>['getValues'];
  errors: any;
  trigger: any;
}

export function MilestoneForm({ index, milestone, register, onChange, onDelete, getValues, trigger, errors }: MilestoneFormProps) {
  return (
    <div
      key={milestone.id}
      className="flex flex-col gap-4 rounded-sm p-4 border-2 border-secondary"
    >
      <div className="form-control">
        <label className="label" htmlFor={`milestones.${index}.title`}>
          <span className="text-label">Title *</span>
        </label>
        <input
          id={`milestones.${index}.title`}
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
          className="input input-md input-bordered input-secondary"
        />
        <InputValidationError error={errors.milestones?.[index]?.title?.message} />
      </div>      
      <div className="form-control">
        <label className="label" htmlFor={`milestones.${index}.description`}>
          <span className="text-label">Description *</span>
        </label>
        <textarea
          key={milestone.id}
          id={`milestones.${index}.description`}
          {...register(`milestones.${index}.description`, {
            required: 'This field is required',
            minLength: {
              value: 25,
              message: 'Minimum length is 25',
            },
            maxLength: {
              value: 250,
              message: 'Maximum length is 250',
            },
          })}
          className="textarea textarea-md textarea-bordered textarea-secondary"
        />
        <InputValidationError error={errors.milestones?.[index]?.description?.message} />
      </div>
      <div className="form-control">
        <label className="label" htmlFor={`milestones.${index}.location.url`}>
          <span className="text-label">Meeting URL *</span>
        </label>
        <input
          type="url"
          key={milestone.id}
          id={`milestones.${index}.location.url`}
          {...register(`milestones.${index}.location.url`, {
            required: 'This field is required',
          })}
          className="input input-md input-bordered input-secondary"
        />
        <InputValidationError error={errors.milestones?.[index]?.location?.url?.message} />
      </div>      
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
            min={getValues(`milestones`)?.[index]?.date?.start?.time}
            disabled={!getValues(`milestones`)?.[index]?.date?.start}
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
        getValues={getValues}
        trigger={trigger}
        required={true}
        error={errors?.milestones?.[index]?.image?.message}
      />
      <div className="flex pt-4 self-end">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onDelete()}
        >
          Delete Milestone
        </button>
      </div>
    </div>
  );
}

export default MilestoneForm;
