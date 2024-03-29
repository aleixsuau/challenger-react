import styles from './ChallengeCreateForm.module.scss';
import { Challenge, Milestone } from '../../typings';
import { useFieldArray, useForm } from 'react-hook-form';
import DateInput from '../../ui/DateInput/ChallengeDateInput';
import FileInput from '../../ui/FileInput/ChallengeFileInput';
import InputValidationError from '../../ui/InputValidationError/ChallengeInputValidationError';
import ChallengeMilestoneForm from '../MilestoneForm/ChallengeMilestoneForm';
import { useAuth } from '@challenger/shared/auth';

/* eslint-disable-next-line */
export interface CreateFormProps {
  challenge?: Challenge;
  onSubmit: (challenge: Challenge) => void;
  onCancel: () => void;
}

export function ChallengeForm({ challenge, onSubmit, onCancel }: CreateFormProps) {
  const {user} = useAuth();
  const defaultMilestone: Milestone = {
    title: '',
    description: '',
    image: '',
    date: { start: undefined, end: undefined },
    location: { url: '' },
  };
  const defaultValues = challenge || {
    title: undefined,
    description: undefined,
    date: { start: undefined, end: undefined },
    milestones: [defaultMilestone],
    host: user!,
  };
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<Challenge>({
    mode: 'onSubmit',
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'milestones',
  });
  const submit = (challenge: Challenge) => {
    if (!isValid) return;

    onSubmit(challenge);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2 p-6" noValidate>
      <div className="form-control">
        <label className="label" htmlFor="title">
          <span className="text-label">Title *</span>
        </label>
        <input
          {...register('title', {
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
          id="title"
          className="input input-md input-bordered input-secondary"
          data-testid="form-title"
        />
        <InputValidationError error={errors.title?.message} />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="description">
          <span className="text-label">Description *</span>
        </label>
        <textarea
          {...register('description', {
            required: 'This field is required',
            minLength: {
              value: 50,
              message: 'Minimum length is 50',
            },
            maxLength: {
              value: 500,
              message: 'Maximum length is 500',
            },
          })}
          id="description"
          className="textarea textarea-md textarea-bordered textarea-secondary"
          data-testid="form-description"
        />
        <InputValidationError error={errors.description?.message} />
      </div>
      <div className="flex flex-wrap">
        <DateInput
          name="date.start"
          legend="Starts"
          value={getValues('date.start')}
          min={new Date().getTime()}
          max={getValues('date')?.end?.time}
          register={register}
          onChange={setValue}
          required={true}
          trigger={trigger}
          error={errors.date?.start?.message}
        />
        <DateInput
          name="date.end"
          legend="Ends"
          value={getValues('date.end')}
          register={register}
          onChange={setValue}
          min={getValues('date')?.start?.time}
          disabled={!getValues('date')?.start}
          required={true}
          trigger={trigger}
          error={errors.date?.end?.message}
        />          
      </div>
      <FileInput
        name="image"
        label="Image"
        register={register}
        onChange={setValue}
        getValues={getValues}
        trigger={trigger}
        required={true}
        error={errors.image?.message}
        data-testid="image"
      />
      <span className="h4">Milestones *</span>
      {fields.map((milestone, index) => <ChallengeMilestoneForm key={milestone.id} index={index} milestone={milestone} onChange={setValue} onDelete={() => remove(index)} register={register} trigger={trigger} getValues={getValues} errors={errors}/>)}
      <div className="flex self-end">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => append(defaultMilestone)}
        >
          Add Milestone
        </button>
      </div>
      <div className="flex items-center justify-end gap-4 rounded-b border-t border-solid border-slate-200 p-6">
        <button
          type="submit"
          className="btn btn-primary"
          data-testid="form-submit"
        >
          {challenge?.id ? 'Update' : 'Create'} Challenge
        </button>
        <button
          className="btn"
          onClick={onCancel}
          data-testid="form-cancel"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ChallengeForm;
