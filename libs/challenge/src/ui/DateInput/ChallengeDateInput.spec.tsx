import { act, fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import DateInput from './ChallengeDateInput';
import dayjs from 'dayjs';
import '@testing-library/jest-dom';
const FormComponent = ({ time, timezone, min, max }: { time?: string, timezone?: string, min?: number, max?: number }) => {
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
        time,
        timezone,
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
          value={getValues('date')}
          onChange={setValue}
          register={register}
          required={true}
          trigger={trigger}
          min={min}
          max={max}
        />
      </form>
    </>
  );
};

describe('DateInput', () => {
  it('should set the value', async () => {
    const time = '222';
    const timezone = 'Europe/Madrid';
    const { getByTestId } = render(<FormComponent time={time} timezone={timezone}/>);

    expect(getByTestId('form-time-value')?.textContent).toEqual(time);
    expect(getByTestId('form-timezone-value')?.textContent).toEqual(timezone);
  });

  it('should disable the dates before the min date', async () => {
    const minDate = dayjs().valueOf();
    const { findByTitle } = render(<FormComponent min={minDate} />);
    const todayDate = dayjs().format('YYYY-MM-DD');
    const beforeMinDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    
    await act(() => {
      const datePickerInput = document.querySelector('.ant-picker-input')?.querySelector('input');
      fireEvent.click(datePickerInput!);
    });

    const todayCell = await findByTitle(todayDate);
    const beforeMinDateCell = await findByTitle(beforeMinDate);

    expect(todayCell).toHaveClass('ant-picker-cell-in-view');
    expect(beforeMinDateCell).toHaveClass('ant-picker-cell-disabled');
  });

  it('should disable the dates after the max date', async () => {
    const maxDate = dayjs().valueOf();
    const { findByTitle } = render(<FormComponent max={maxDate} />);
    const todayDate = dayjs().format('YYYY-MM-DD');
    const afterMaxDate = dayjs().add(4, 'day').format('YYYY-MM-DD');

    await act(() => {
      const datePickerInput = document.querySelector('.ant-picker-input')?.querySelector('input');
      fireEvent.click(datePickerInput!);
    });
    const todayCell = await findByTitle(todayDate);
    const afterMaxDateCell = await findByTitle(afterMaxDate);

    expect(todayCell).toHaveClass('ant-picker-cell-in-view');
    expect(afterMaxDateCell).toHaveClass('ant-picker-cell-disabled');
  });

  it('should format its value as a `ChallengeDate`', async () => {
    const { getByTestId } = render(<FormComponent />);
    const testDate = '2023-04-14 08:30';
    const testDateMilliseconds = dayjs(testDate).valueOf();

    await act(() => {
      const datePickerInput = document.querySelector('.ant-picker-input')?.querySelector('input');
      fireEvent.mouseDown(datePickerInput!);
      fireEvent.change(datePickerInput!, {
        target: { value: testDate },
      });

      fireEvent.click(document.querySelector('.ant-btn-primary')!);
    });

    expect(getByTestId('form-time-value')?.textContent).toEqual(testDateMilliseconds.toString());
    expect(getByTestId('form-timezone-value')?.textContent).not.toBeFalsy();
  });

  it('should remove the value and set validation error if the date is removed', async () => {
    const { getByTestId, getAllByRole } = render(<FormComponent />);

    await act(() => {
      const datePickerInput = document.querySelector('.ant-picker-input')?.querySelector('input');
      fireEvent.mouseDown(datePickerInput!);
      fireEvent.change(datePickerInput!, {
        target: { value: '2050-12-12 08:30' },
      });
      fireEvent.click(document.querySelector('.ant-btn-primary')!);
    });

    await act(async () => {
      const datePickerInput = document.querySelector('.ant-picker-input')?.querySelector('input');
      fireEvent.mouseOver(datePickerInput!);
      const closeIcon = (getAllByRole('img', { name: 'close-circle' })[0]).parentElement;
      await fireEvent.mouseUp(closeIcon!);
    });

    expect(getByTestId('form-time-value')?.textContent).toEqual('');
    expect(getByTestId('form-timezone-value')?.textContent).toEqual('');
    expect(getByTestId('form-required-error')?.textContent).toEqual(
      'Date and time are required'
    );
  });
});
