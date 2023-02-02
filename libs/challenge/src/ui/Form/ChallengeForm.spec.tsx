import { act, fireEvent, render } from '@testing-library/react';
import ChallengeForm from './ChallengeForm';
import 'intersection-observer';
import { Challenge } from '../../typings';

describe('ChallengeForm', () => {
  const onSave = jest.fn();
  const onClose = jest.fn();

  it('should be shown programmatically', () => {    
    const { queryByTestId, rerender } = render(<ChallengeForm show={true} onSave={onSave} onClose={onClose} />);

    expect(queryByTestId('challenge-form')).toBeTruthy();

    rerender(<ChallengeForm show={false} onSave={onSave} onClose={onClose} />);

    expect(queryByTestId('challenge-form')).toBeFalsy();
  });

  it.only('should emit the challenge, reset and close the form when saved', async () => {
    const { queryByPlaceholderText, getByTestId, rerender } = render(<ChallengeForm show={true} onSave={onSave} onClose={onClose} />);
    const titleInput = queryByPlaceholderText('Title');
    const descriptionInput = queryByPlaceholderText('Description');
    const expectedChallenge: Challenge = {
      title: 'Title',
      description: 'Description',
      date: {
        start: {
          time: 123456789,
          timezone: 'Europe/Madrid',
        },
        end: {
          time: 123456789,
          timezone: 'Europe/Madrid',
        },
      },
      milestones: [
        {
          title: 'Title',
          description: 'Description',
          image: {
            url: 'https://images.unsplash.com/photo-1610000000000-000000000000?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            alt: 'Title',
          },
          location: {
            url: 'https://meet.google.com',
          },
          date: {
            start: {
              time: 123456789,
              timezone: 'Europe/Madrid',
            },
            end: {
              time: 123456789,
              timezone: 'Europe/Madrid',
            },
          },
        }
      ],
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
