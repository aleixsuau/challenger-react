import styles from './ChallengeCreateForm.module.scss';
import { Challenge, Milestone } from '../../typings';
import { useFieldArray, useForm } from 'react-hook-form';
import DateInput from '../DateInput/ChallengeDateInput';
import FileInput from '../FileInput/ChallengeFileInput';
import { Dialog } from '@challenger/shared/ui';
import ChallengeMilestoneForm from '../MilestoneForm/ChallengeMilestoneForm';

/* eslint-disable-next-line */
export interface CreateFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (challenge: Challenge) => void;
}

export function ChallengeForm({ show, onSubmit, onClose }: CreateFormProps) {
  const defaultMilestone: Milestone = {
    title: '',
    description: '',
    image: '',
    date: { start: undefined, end: undefined },
    location: { url: '' },
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
    defaultValues: {
      title: undefined,
      description: undefined,
      date: { start: undefined, end: undefined },
      milestones: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'milestones',
  });
  const handleClose = () => {
    reset();
    onClose();
  };
  const submit = (challenge: Challenge) => {
    if (!isValid) return;

    onSubmit(challenge);
    handleClose();
  };

  return show ? (
    <Dialog title="Challenge Form" show={show} onClose={handleClose} data-testid="form">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4" noValidate>
        <label>
          <span>Title *</span>
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
            className="input"
            data-testid="form-title"
          />
          <p className="text-error pt-2 text-sm">
            {errors.title?.message}
          </p>
        </label>
        <label>
          <span>Description *</span>
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
            className="input"
            data-testid="form-description"
          />
          <p className="text-error text-sm">
            {errors.description?.message}
          </p>
        </label>
        <div className="flex flex-wrap gap-8">
          <div>
            <DateInput
              name="date.start"
              legend="Starts"
              register={register}
              onChange={setValue}
              required={true}
              trigger={trigger}
            />
            <p className="text-error text-sm">
              {errors.date?.start?.message}
            </p>
          </div>
          <div>
            <DateInput
              name="date.end"
              legend="Ends"
              register={register}
              onChange={setValue}
              min={getValues('date')?.start?.time}
              disabled={!getValues('date')?.start}
              required={true}
              trigger={trigger}
            />
            <p className="text-error text-sm">
              {errors.date?.end?.message}
            </p>
          </div>          
        </div>
        <FileInput
          name="image"
          label="Image"
          register={register}
          onChange={setValue}
          required={true}
          trigger={trigger}
        />
        {errors.image?.message  && <p className="text-error text-sm">{errors.image?.message}</p>}
        <h3>Milestones</h3>
        {fields.map((milestone, index) => <ChallengeMilestoneForm index={index} milestone={milestone} onChange={setValue} onDelete={() => remove(index)} register={register} trigger={trigger} errors={errors}/>)}
        <button
          type="button"
          className="button accent"
          onClick={() => append(defaultMilestone)}
        >
          +
        </button>
        <div className="flex items-center justify-end gap-4 rounded-b border-t border-solid border-slate-200 p-6">
          <button
            type="submit"
            className="button accent"
            data-testid="form-submit"
          >
            Create Challenge
          </button>
          <button
            className="button"
            onClick={handleClose}
            data-testid="form-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </Dialog>
  ) : null;
}

export default ChallengeForm;
