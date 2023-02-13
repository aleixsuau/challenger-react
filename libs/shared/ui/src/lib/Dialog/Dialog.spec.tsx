import { act, render } from '@testing-library/react';
import { DialogProvider, useDialog } from './Dialog';
import 'intersection-observer';

describe('Dialog', () => {
  describe('Open / Close', () => {
    it('should open programatically', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <DialogOpenButtonMock />
        </DialogProvider>
      );

      await act(async () => await queryByTestId('dialog-open-button-mock')?.click());

      expect(queryByTestId('dialog')).toBeTruthy();
    });

    it('should close programatically', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <DialogOpenButtonMock />
          <DialogCloseButtonMock />
        </DialogProvider>
      );

      await act(async () => await queryByTestId('dialog-open-button-mock')?.click());

      expect(queryByTestId('dialog')).toBeTruthy();

      await act(async () => await queryByTestId('dialog-close-button-mock')?.click());

      expect(queryByTestId('dialog')).toBeFalsy();
    });

    it('should close from the dialog`s template close button', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <DialogOpenButtonMock />
        </DialogProvider>
      );

      await act(async () => await queryByTestId('dialog-open-button-mock')?.click());

      expect(queryByTestId('dialog')).toBeTruthy();

      await act(async () => await queryByTestId('dialog-close-button')?.click());

      expect(queryByTestId('dialog')).toBeFalsy();
    });

    it('should provide its open/close status', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <DialogOpenButtonMock />
          <DialogStatusMock />
        </DialogProvider>
      );

      expect(queryByTestId('dialog-status-mock').textContent).toBe('false');

      await act(async () => await queryByTestId('dialog-open-button-mock')?.click());
      
      expect(queryByTestId('dialog-status-mock').textContent).toBe('true');

      await act(async () => await queryByTestId('dialog-close-button')?.click());

      expect(queryByTestId('dialog-status-mock').textContent).toBe('false');
    });
  });

  describe('UI', () => {
    it('should display its title', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <DialogOpenButtonMock />
        </DialogProvider>
      );

      await act(async () => await queryByTestId('dialog-open-button-mock')?.click());

      expect(queryByTestId('dialog-title')?.textContent).toBe('test-title');
    });

    it('should display its children', async () => {
      const { queryByTestId } = render(
        <DialogProvider>
          <DialogOpenButtonMock />
        </DialogProvider>
      );

      await act(async () => await queryByTestId('dialog-open-button-mock')?.click());

      expect(queryByTestId('dialog-children-prop')).toBeTruthy();
    });
  });
});

const DialogOpenButtonMock = () => {
  const dialog = useDialog();
  return <button onClick={() => dialog.open(<DialogChildrenMock />, 'test-title')} data-testid="dialog-open-button-mock">Open dialog</button>;
};

const DialogCloseButtonMock = () => {
  const dialog = useDialog();
  return <button onClick={() => dialog.close()} data-testid="dialog-close-button-mock">Close dialog</button>;
};

const DialogStatusMock = () => {
  const dialog = useDialog();
  return <div data-testid="dialog-status-mock">{`${dialog.isOpen}`}</div>;
};

const DialogChildrenMock = () => {
  return <div data-testid="dialog-children-prop"></div>;
};
