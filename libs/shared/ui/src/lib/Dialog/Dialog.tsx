import styles from './Dialog.module.scss';
import { Dialog as HeadlessUIDialog } from '@headlessui/react';
import { createContext, useContext, useState } from 'react';

/* eslint-disable-next-line */
export interface DialogProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface DialogContext {
  isOpen: boolean;
  open: (dialogChildren: React.ReactNode, title?: string) => void;
  close: () => void;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

const DialogContext = createContext<DialogContext | undefined>(undefined);

export const useDialog = (): DialogContext => {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
};

export const DialogProvider = ({
  children: dialogProviderChildren,
}: DialogProviderProps) => {
  const [isOpen, setIsOpen] = useState<DialogProps['show']>(false);
  const [title, setTitle] = useState<DialogProps['title']>(undefined);
  const [children, setChildren] = useState<DialogProps['children']>(undefined);
  const open = (children: React.ReactNode, title?: string) => {
    setChildren(children);
    setTitle(title);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider value={{ isOpen, open, close }}>
      {dialogProviderChildren}
      <Dialog
        show={isOpen}
        title={title}
        children={children}
        onClose={() => setIsOpen(false)}
      />
    </DialogContext.Provider>
  );
};

export function Dialog({ show, title, children, onClose }: DialogProps) {
  return (
    <HeadlessUIDialog open={show} onClose={onClose} data-testid="dialog">
      <div
        id="backdrop"
        className="fixed inset-0 z-40 bg-black opacity-25"
      ></div>
      <HeadlessUIDialog.Panel className="fixed inset-0 z-50 my-40 mx-auto max-w-[90%] items-center justify-center outline-none focus:outline-none">
        <button
          className="btn btn-primary btn-circle absolute top-4 right-4"
          onClick={onClose}
          data-testid="dialog-close-button"
        >
          <span className="text-2xl outline-none focus:outline-none">×</span>
        </button>
        <div className="w-full overflow-y-auto overflow-x-hidden rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
          {title && (
            <div className="mb-4 border-b border-solid border-slate-200 p-5">
              <HeadlessUIDialog.Title
                className="text-primary-dark text-3xl font-semibold"
                data-testid="dialog-title"
              >
                {title}
              </HeadlessUIDialog.Title>
            </div>
          )}
          <HeadlessUIDialog.Description
            as="div"
            className="text-primary flex flex-col gap-4 text-lg leading-relaxed"
          >
            {children}
          </HeadlessUIDialog.Description>
        </div>
      </HeadlessUIDialog.Panel>
    </HeadlessUIDialog>
  );
}

export default Dialog;
