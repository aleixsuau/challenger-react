import styles from './Dialog.module.scss';
import { Dialog as HeadlessUIDialog } from '@headlessui/react';
import { createContext, useContext, useState } from 'react';

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
  const [isDialogOpen, setIsDialogOpen] = useState<DialogProps['show']>(false);
  const [title, setTitle] = useState<DialogProps['title']>(undefined);
  const [children, setChildren] = useState<DialogProps['children']>(undefined);
  const openDialog = (children: React.ReactNode, title?: string) => {
    setChildren(children);
    setTitle(title);
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <DialogContext.Provider value={{ isDialogOpen, openDialog, closeDialog }}>
      {dialogProviderChildren}
      <Dialog
        show={isDialogOpen}
        title={title}
        children={children}
        onClose={() => setIsDialogOpen(false)}
      />
    </DialogContext.Provider>
  );
};

function Dialog({ show, title, children, onClose }: DialogProps) {
  return (
    <HeadlessUIDialog open={show} onClose={onClose} data-testid="dialog">
      <div
        id="backdrop"
        className="fixed inset-0 z-40 bg-black opacity-25"
      ></div>       
      <HeadlessUIDialog.Panel className="fixed inset-0 z-50 my-40 rounded-lg mx-auto max-w-[90%] max-h-[80vh] items-center justify-center outline-none overflow-scroll focus:outline-none">
        <div className="w-full border-0 bg-white shadow-lg outline-none focus:outline-none">          
          {/* HEADER */}                  
          <div className={`sticky top-0 z-10 ${title ? 'bg-white mb-4 border-b border-solid border-slate-200 p-5' : ''}`}>
            {title && (
              <HeadlessUIDialog.Title
                className="text-primary-dark text-3xl font-semibold"
                data-testid="dialog-title"
              >
                {title}
              </HeadlessUIDialog.Title> 
            )}
            <button
              className="btn btn-primary btn-circle absolute z-20 top-4 right-4"
              onClick={onClose}
              data-testid="dialog-close-button"
            >
              <span className="text-2xl outline-none focus:outline-none">×</span>
            </button>                    
          </div>
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

export interface DialogProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface DialogContext {
  isDialogOpen: boolean;
  openDialog: (dialogChildren: React.ReactNode, title?: string) => void;
  closeDialog: () => void;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

const DialogContext = createContext<DialogContext | undefined>(undefined);
