import { act, fireEvent, render } from '@testing-library/react';
import ChallengeForm from './ChallengeForm';
import 'intersection-observer';

describe('ChallengeForm', () => {
  const onSave = jest.fn();
  const onClose = jest.fn();

  it('should be shown programmatically', () => {    
    const { queryByTestId, rerender } = render(<ChallengeForm show={true} onSave={onSave} onClose={onClose} />);

    expect(queryByTestId('challenge-form')).toBeTruthy();

    rerender(<ChallengeForm show={false} onSave={onSave} onClose={onClose} />);

    expect(queryByTestId('challenge-form')).toBeFalsy();
  });

  it('should emit the challenge, reset and close the form when saved', async () => {
    const { queryByPlaceholderText, getByTestId, rerender } = render(<ChallengeForm show={true} onSave={onSave} onClose={onClose} />);
    const titleInput = queryByPlaceholderText('Title');
    const descriptionInput = queryByPlaceholderText('Description');
    const expectedChallenge = {
      title: 'Title',
      description: 'Description',
    };

    await act(() => {
      fireEvent.change(titleInput!, { target: { value: 'Title' }});
      fireEvent.change(descriptionInput!, { target: { value: 'Description' }});
      getByTestId('challenge-form-submit')?.click();
    });

    expect(onSave).toHaveBeenCalledWith(expectedChallenge);
    expect(onClose).toHaveBeenCalled();

    rerender(<ChallengeForm show={true} onSave={onSave} onClose={onClose} />);

    expect((queryByPlaceholderText('Title') as HTMLInputElement).value).toBe('');
    expect((queryByPlaceholderText('Description') as HTMLInputElement).value).toBe('');
  });

  it('should reset the form when canceled', async () => {
    const { queryByPlaceholderText, getByTestId, rerender } = render(<ChallengeForm show={true} onSave={onSave} onClose={onClose} />);
    const titleInput = queryByPlaceholderText('Title');
    const descriptionInput = queryByPlaceholderText('Description');

    await act(async () => {
      fireEvent.change(titleInput!, { target: { value: 'Title' } });
      fireEvent.change(descriptionInput!, { target: { value: 'Description' } });
      await getByTestId('challenge-form-cancel')?.click();
    });

    expect(onClose).toHaveBeenCalled();

    rerender(<ChallengeForm show={true} onSave={onSave} onClose={onClose} />);

    expect((queryByPlaceholderText('Title') as HTMLInputElement).value).toBe('');
    expect((queryByPlaceholderText('Description') as HTMLInputElement).value).toBe('');
  });
});
