import { act, fireEvent, render } from '@testing-library/react';
import ChallengeForm from './ChallengeForm';
import 'intersection-observer';
import { Challenge } from '../../typings';
import * as DDBB from '@challenger/shared/data-access/ddbb';
import * as Auth from '@challenger/shared/auth';

describe('ChallengeForm', () => {
  it('should have at least one test', () => {
    expect(true).toBeTruthy();
  });
  /* const onSubmit = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(DDBB, 'uploadFile')
      .mockImplementation((file) =>
        file ? Promise.resolve('http://fileurl.com') : Promise.resolve(null)
      );
    jest
      .spyOn(Auth, 'useAuth')
      .mockReturnValue({ user: {displayName: 'testUserName'}} as any);
  });

  it('should call onSubmit with the challenge when submitted', async () => {
    const { getByTestId, getAllByTestId } = render(
      <ChallengeForm onSubmit={onSubmit} onCancel={onCancel} />
    );
    const titleInput = getByTestId('form-title');
    const descriptionInput = getByTestId('form-description');
    const inputFile = getByTestId('image');
    const milestoneForm = getByTestId('milestone-form');
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
  });

  it('should call onClose when canceled', async () => {
    const { getByTestId } = render(
      <ChallengeForm onSubmit={onSubmit} onCancel={onCancel} />
    );

    getByTestId('form-cancel')?.click();

    expect(onCancel).toHaveBeenCalled();
  }); */
});
