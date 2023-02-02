import styles from './ChallengeCreateForm.module.scss';
import { Dialog } from '@headlessui/react'
import { Challenge, Milestone } from '../../typings';
import { useFieldArray, useForm } from "react-hook-form";
import DateInput from '../DateInput/ChallengeDateInput';

/* eslint-disable-next-line */
export interface CreateFormProps {
  show: boolean;
  onClose: () => void;
  onSave: (challenge: Challenge) => void;
}

export function ChallengeForm({ show, onSave, onClose }: CreateFormProps) {
  const defaultMilestone: Milestone = { title: '', description: '', image: {url: '', alt: ''}, date: { start: { time: 0, timezone: '' }, end: { time: 0, timezone: '' } }, location: { url: '' } };
  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors, isValid } } = useForm<Challenge>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      date: { start: { time: 0, timezone: '' }, end: { time: 0, timezone: '' } },
      milestones: []
    }
  });
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "milestones"
  });
  const handleClose = () => {
    reset();
    onClose();
  }
  const save = (challenge: Challenge) => {
    onSave(challenge);
    handleClose();
  }
  
  return (
    show ?
      <Dialog open={show} onClose={handleClose} data-testid="challenge-form">
        <div id="backdrop" className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        <Dialog.Panel className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center my-40 mx-auto max-w-xl">
          <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
            <div className="flex flex-col">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200">
                <Dialog.Title className="text-3xl text-primary-dark font-semibold">
                  Challenge
                </Dialog.Title>
                <button
                  className="p-1 text-primary text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={handleClose}
                  data-testid="challenge-form-close"
                >
                  <span className="bg-transparent hover:text-black text-2xl outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <form onSubmit={handleSubmit(save)}>
                <Dialog.Description as="div" className="flex flex-col my-4 p-6 text-primary text-lg leading-relaxed gap-4">
                    <label>
                      <span>Title *</span>                    
                    <input {...register('title', { required: 'This field is required', minLength: {
                      value: 3,
                      message: 'Minimum length is 3'
                    }, maxLength: {
                      value: 25,
                      message: 'Maximum length is 25'
                    } })} className="input" />
                    <p className="text-error text-sm pt-2">{errors.title?.message}</p>
                    </label>
                    <label>
                      <span>Description *</span>
                    <textarea {...register('description', {
                      required: 'This field is required', minLength: {
                        value: 50,
                        message: 'Minimum length is 50'
                      }, maxLength: {
                        value: 500,
                        message: 'Maximum length is 500'
                      }
                    })} className="input" />
                    <p className="text-error text-sm">{errors.description?.message}</p>
                    </label>
                  <DateInput name={`date.start`} legend={'Start'} onChange={setValue}></DateInput>
                  <DateInput name={`date.end`} legend={'End'} onChange={setValue}></DateInput>
                  <h3>Milestones</h3>
                  {fields.map((milestone, index) => {
                    return (
                      <div key={milestone.id} className="flex flex-col gap-4 bg-primary-background p-4 rounded-sm">
                        <label>
                          <span>Title</span>
                          <input
                            key={milestone.id}
                            {...register(`milestones.${index}.title`, { required: true, maxLength: 25 })}
                            className="input"
                          />
                        </label>
                        <label>
                          <span>Description</span>
                          <input
                            key={milestone.id}
                            {...register(`milestones.${index}.description`, { required: true, maxLength: 250 })}
                            className="input"
                          />
                        </label>
                        <label>
                          <span>Meeting URL</span>
                          <input
                            key={milestone.id}
                            {...register(`milestones.${index}.location.url`, { required: true })}
                            className="input"
                          />
                        </label>
                        <DateInput name={`milestones[${index}].date`} legend={'Start'} onChange={setValue}></DateInput>
                        <DateInput name={`milestones[${index}].date`} legend={'End'} onChange={setValue}></DateInput>                            
                        <label>
                          <span>Image</span>
                          <input
                            key={milestone.id}
                            {...register(`milestones.${index}.image.url`)}
                            className="input"
                          />
                        </label>
                        <div className="flex content-start gap-4">
                          <button type="button" className="button" onClick={() => remove(index)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}                 

                  <button type="button" className="button accent" onClick={() => append(defaultMilestone)}>+</button>

                </Dialog.Description>                      
                <div className="flex items-center justify-end p-6 border-t gap-4 border-solid border-slate-200 rounded-b">
                  <button type="submit" className="button accent" data-testid="challenge-form-submit">Create Challenge</button>
                  <button className="button" onClick={handleClose} data-testid="challenge-form-cancel">Cancel</button>
                </div>   
              </form>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> :
      null
  );
}

export default ChallengeForm;
