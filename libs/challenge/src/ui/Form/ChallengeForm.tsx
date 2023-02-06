import styles from './ChallengeCreateForm.module.scss';
import { Dialog } from '@headlessui/react';
import { Challenge, Milestone } from '../../typings';
import { useFieldArray, useForm } from 'react-hook-form';
import DateInput from '../DateInput/ChallengeDateInput';
import FileInput from '../FileInput/ChallengeFileInput';

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
    date: { start: { time: 0, timezone: '' }, end: { time: 0, timezone: '' } },
    location: { url: '' },
  };
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Challenge>({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
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
    <Dialog open={show} onClose={handleClose} data-testid="form">
      <div
        id="backdrop"
        className="fixed inset-0 z-40 bg-black opacity-25"
      ></div>

      <Dialog.Panel className="fixed inset-0 z-50 my-40 mx-auto max-w-xl items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative w-full rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
          <div className="flex flex-col">
            <div className="flex items-start justify-between border-b border-solid border-slate-200 p-5">
              <Dialog.Title className="text-primary-dark text-3xl font-semibold">
                Challenge
              </Dialog.Title>
              <button
                className="text-primary p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                onClick={handleClose}
                data-testid="form-close"
              >
                <span className="bg-transparent text-2xl outline-none hover:text-black focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <Dialog.Description
              as="div"
              className="text-primary my-4 flex flex-col gap-4 p-6 text-lg leading-relaxed"
            >
              <form onSubmit={handleSubmit(submit)} noValidate>
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
                <DateInput
                  name="date.end"
                  legend="Ends"
                  register={register}
                  onChange={setValue}
                  required={true}
                  trigger={trigger}
                />
                <p className="text-error text-sm">
                  {errors.date?.end?.message}
                </p>
                <FileInput
                  name="image"
                  label="Image"
                  register={register}
                  onChange={setValue}
                  required={true}
                  trigger={trigger}
                />
                <p className="text-error text-sm">{errors.image?.message}</p>
                <h3>Milestones</h3>
                {fields.map((milestone, index) => {
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
                            required: true,
                            maxLength: 25,
                          })}
                          className="input"
                        />
                      </label>
                      <label>
                        <span>Description</span>
                        <input
                          key={milestone.id}
                          {...register(`milestones.${index}.description`, {
                            required: true,
                            maxLength: 250,
                          })}
                          className="input"
                        />
                      </label>
                      <label>
                        <span>Meeting URL</span>
                        <input
                          key={milestone.id}
                          {...register(`milestones.${index}.location.url`, {
                            required: true,
                          })}
                          className="input"
                        />
                      </label>
                      <DateInput
                        name={`milestones[${index}].date.start`}
                        legend="Starts"
                        onChange={setValue}
                        register={register}
                        required={true}
                        trigger={trigger}
                      />
                      <p className="text-error text-sm">
                        {errors?.milestones?.[index]?.date?.start?.message}
                      </p>
                      <DateInput
                        name={`milestones[${index}].date.end`}
                        legend="Ends"
                        onChange={setValue}
                        register={register}
                        required={true}
                        trigger={trigger}
                      />
                      <p className="text-error text-sm">
                        {errors?.milestones?.[index]?.date?.end?.message}
                      </p>
                      <FileInput
                        name={`milestones.${index}.image`}
                        label="Image"
                        register={register}
                        onChange={setValue}
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
                          onClick={() => remove(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
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
            </Dialog.Description>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  ) : null;
}

export default ChallengeForm;
