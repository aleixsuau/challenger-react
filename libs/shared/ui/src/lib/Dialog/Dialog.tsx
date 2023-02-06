import styles from './Dialog.module.scss';
import { Dialog as HeadlessUIDialog } from '@headlessui/react';

/* eslint-disable-next-line */
export interface DialogProps {
  show: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ show, title, onClose, children }: DialogProps) {
  return (
    <HeadlessUIDialog open={show} onClose={onClose} data-testid="form">
      <div
        id="backdrop"
        className="fixed inset-0 z-40 bg-black opacity-25"
      ></div>

      <HeadlessUIDialog.Panel className="fixed inset-0 z-50 my-40 mx-auto max-w-xl items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative w-full rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
          <div className="flex flex-col">
            <div className="flex items-start justify-between border-b border-solid border-slate-200 p-5">
              <HeadlessUIDialog.Title className="text-primary-dark text-3xl font-semibold">
                {title}
              </HeadlessUIDialog.Title>
              <button
                className="text-primary p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                onClick={onClose}
                data-testid="form-close"
              >
                <span className="bg-transparent text-2xl outline-none hover:text-black focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <HeadlessUIDialog.Description
              as="div"
              className="text-primary my-4 flex flex-col gap-4 p-6 text-lg leading-relaxed"
            >
              {children}
            </HeadlessUIDialog.Description>
          </div>
        </div>
      </HeadlessUIDialog.Panel>
    </HeadlessUIDialog>
  );
}

export default Dialog;
