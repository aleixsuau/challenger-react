import { act, fireEvent, render, waitFor } from '@testing-library/react';
import FileInput from './ChallengeFileInput';
import * as DDBB from '@challenger/shared/data-access/ddbb';
import { useForm } from 'react-hook-form';

const FormComponent = () => {
  const { register, trigger, setValue, watch, getValues, formState: { errors } } = useForm<any>({
    mode: 'onChange',
    defaultValues: {
      image: undefined,
    }
  });

  return (
    <>
      <span data-testid="form-image-value">{getValues('image')}</span>
      <span data-testid="form-required-error">{errors.image?.message as any}</span>
      <form>
        <FileInput name="image" label="Image" register={register} onChange={setValue} required={true} trigger={trigger} getValues={getValues} />
      </form>
    </>
  );
}


describe('FileInput', () => {
  const testFile = new File(['test'], 'test.png', { type: 'image/png' });
  const testDDBBFileUrl = 'http://fileurl.com';

  beforeEach(() => {
    jest.spyOn(DDBB, 'uploadFile').mockImplementation((file) => file ? Promise.resolve(testDDBBFileUrl) : Promise.resolve(null));
  });
  
  it('should set the file`s DDBB URL as a value', async () => {
    const { getByTestId } = render(<FormComponent />);
    const inputFile = getByTestId('input-file');
    
    await act(async () => {
      await fireEvent.change(inputFile!, {
        target: { files: [testFile] },
      });
    });

    expect(getByTestId('form-image-value')?.textContent).toEqual(testDDBBFileUrl);
  });

  it('should remove the value and set validation error if date or time are removed', async () => {
    const { getByTestId } = render(<FormComponent />);
    const inputFile = getByTestId('input-file');

    await act(async () => {
      await fireEvent.change(inputFile!, {
        target: { files: [testFile] },
      });

      await fireEvent.change(inputFile!, {
        target: { files: null },
      });
    });

    expect(getByTestId('form-image-value')?.textContent).toEqual('');
    expect(getByTestId('form-required-error')?.textContent).toEqual('This field is required');

    await act(async () => {
      await fireEvent.change(inputFile!, {
        target: { files: [testFile] },
      });
    });

    expect(getByTestId('form-image-value')?.textContent).toEqual(testDDBBFileUrl);
    expect(getByTestId('form-required-error')?.textContent).toEqual('');
  });
});
