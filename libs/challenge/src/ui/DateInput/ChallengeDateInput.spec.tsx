import { act, fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import DateInput from './ChallengeDateInput';

const FormComponent = () => {
  const {
    register,
    trigger,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: 'onChange',
    defaultValues: {
      date: {
        time: undefined,
        timezone: undefined,
      },
    },
  });

  return (
    <>
      <span data-testid="form-time-value">{getValues('date')?.time}</span>
      <span data-testid="form-timezone-value">{getValues('date')?.timezone}</span>
      <span data-testid="form-required-error">{errors.date?.message as any}</span>
      <form>
        <DateInput
          name="date"
          legend="Starts"
          onChange={setValue}
          register={register}
          required={true}
          trigger={trigger}
        />
      </form>
    </>
  );
};

describe('DateInput', () => {
  it('should format its value as a `ChallengeDate`', async () => {
    const { getByTestId } = render(<FormComponent />);

    await act(async () => {
      await fireEvent.change(getByTestId('input-date')!, {
        target: { value: '2012-12-12' },
      });
      await fireEvent.change(getByTestId('input-time')!, {
        target: { value: '12:12' },
      });
    });

    expect(getByTestId('form-time-value')?.textContent).toEqual('1355310720000');
    expect(getByTestId('form-timezone-value')?.textContent).toEqual('Europe/Madrid');
  });

  it('should remove the value and set validation error if date or time are removed', async () => {
    const { getByTestId } = render(<FormComponent />);

    await act(async () => {
      await fireEvent.change(getByTestId('input-date')!, {
        target: { value: '2012-12-12' },
      });
      await fireEvent.change(getByTestId('input-time')!, {
        target: { value: '12:12' },
      });
      await fireEvent.change(getByTestId('input-date')!, { target: { value: null } });
    });

    expect(getByTestId('form-time-value')?.textContent).toEqual('');
    expect(getByTestId('form-timezone-value')?.textContent).toEqual('');
    expect(getByTestId('form-required-error')?.textContent).toEqual(
      'Date and time are required'
    );

    await act(async () => {
      await fireEvent.change(getByTestId('input-date')!, {
        target: { value: '2012-12-12' },
      });
      await fireEvent.change(getByTestId('input-time')!, {
        target: { value: '12:12' },
      });
    });

    expect(getByTestId('form-required-error')?.textContent).toEqual('');
  });
});
