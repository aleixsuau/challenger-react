import { act, fireEvent, render } from '@testing-library/react';
import ChallengeForm from './ChallengeForm';
import 'intersection-observer';
import { Challenge } from '../../typings';
import * as DDBB from '@challenger/shared/data-access/ddbb';

describe('ChallengeForm', () => {
  const onSubmit = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(DDBB, 'uploadFile')
      .mockImplementation((file) =>
        file ? Promise.resolve('http://fileurl.com') : Promise.resolve(null)
      );
  });

  it('should be shown programmatically', () => {
    const { queryByTestId, rerender } = render(
      <ChallengeForm show={true} onSubmit={onSubmit} onClose={onClose} />
    );

    expect(queryByTestId('form')).toBeTruthy();

    rerender(
      <ChallengeForm show={false} onSubmit={onSubmit} onClose={onClose} />
    );

    expect(queryByTestId('form')).toBeFalsy();
  });

  it('should emit the challenge, reset and close the form when saved', async () => {
    const { getByTestId, getAllByTestId, rerender } = render(
      <ChallengeForm show={true} onSubmit={onSubmit} onClose={onClose} />
    );
    const titleInput = getByTestId('form-title');
    const descriptionInput = getByTestId('form-description');
    const inputFile = getByTestId('input-file');
    const expectedChallenge: Challenge = {
      title: 'Title',
      description:
        'Description50CharactersLongggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
      date: {
        start: {
          time: 1355310720000,
          timezone: 'Europe/Madrid',
        },
        end: {
          time: 1355310720000,
          timezone: 'Europe/Madrid',
        },
      },
      image: 'http://fileurl.com',
      milestones: [],
    };
    const testFile = new File(['test'], 'test.png', { type: 'image/png' });

    await act(() => {
      fireEvent.change(titleInput!, { target: { value: 'Title' } });
      fireEvent.change(descriptionInput!, {
        target: {
          value:
            'Description50CharactersLongggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
        },
      });
      getAllByTestId('input-date').forEach((input) => {
        fireEvent.change(input, {
          target: { value: '2012-12-12' },
        });
      });

      getAllByTestId('input-time').forEach((input) => {
        fireEvent.change(input, {
          target: { value: '12:12' },
        });
      });

      fireEvent.change(inputFile!, {
        target: { files: [testFile] },
      });
    });

    await act(() => {
      getByTestId('form-submit')?.click();
    });

    expect(onSubmit).toHaveBeenCalledWith(expectedChallenge);
    expect(onClose).toHaveBeenCalled();

    rerender(
      <ChallengeForm show={true} onSubmit={onSubmit} onClose={onClose} />
    );

    expect((getByTestId('form-title') as HTMLInputElement).value).toBe('');
    expect((getByTestId('form-description') as HTMLInputElement).value).toBe(
      ''
    );
  });

  it('should reset the form when canceled', async () => {
    const { getByTestId, rerender } = render(
      <ChallengeForm show={true} onSubmit={onSubmit} onClose={onClose} />
    );
    const titleInput = getByTestId('form-title');
    const descriptionInput = getByTestId('form-description');

    await act(async () => {
      fireEvent.change(titleInput!, { target: { value: 'Title' } });
      fireEvent.change(descriptionInput!, { target: { value: 'Description' } });
      await getByTestId('form-cancel')?.click();
    });

    expect(onClose).toHaveBeenCalled();

    rerender(
      <ChallengeForm show={true} onSubmit={onSubmit} onClose={onClose} />
    );

    expect((getByTestId('form-title') as HTMLInputElement).value).toBe('');
    expect((getByTestId('form-description') as HTMLInputElement).value).toBe(
      ''
    );
  });
});
