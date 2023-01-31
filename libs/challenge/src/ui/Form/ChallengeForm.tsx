import styles from './ChallengeCreateForm.module.scss';
import { Dialog } from '@headlessui/react'
import { Challenge } from '../../typings';
import { useForm } from "react-hook-form";

/* eslint-disable-next-line */
export interface CreateFormProps {
  show: boolean;
  onClose: () => void;
  onSave: (challenge: Challenge) => void;
}

export function ChallengeForm({ show, onSave, onClose }: CreateFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Challenge>();
  const handleClose = () => {
    reset();
    onClose();
  }
  const handleOnSave = (challenge: Challenge) => {
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
              <form onSubmit={handleSubmit(handleOnSave)}>
                <Dialog.Description className="flex flex-col my-4 p-6 text-primary text-lg leading-relaxed gap-4">                    
                    <input placeholder="Title" {...register('title')} className="input" />
                    <textarea placeholder="Description" {...register('description')} className="input" />
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
