import { deleteFile, uploadFile } from '@challenger/shared/data-access/ddbb';
import { Challenge } from '../../typings';
import InputValidationError from '../InputValidationError/ChallengeInputValidationError';
import { ChangeEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/20/solid';
import styles from './ChallengeFileInput.module.scss';

/* eslint-disable-next-line */
export interface FileInputProps {
  // TODO: type this
  label: string;
  name: any;
  register: any;
  trigger: any;
  getValues: UseFormReturn<Challenge>['getValues'];
  onChange: UseFormReturn<Challenge>['setValue'];
  required?: boolean;
  error?: string;
}

export function FileInput({
  name,
  label,
  register,
  onChange,
  trigger,
  getValues,
  required,
  error
}: FileInputProps) {
  const imageUrl = getValues(name);
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    const fileDDBBUrlResult = await uploadFile(file);

    onChange(name, fileDDBBUrlResult);
    trigger(name);
  };
  const handleDelete = async (imageUrl: string) => {
    await deleteFile(imageUrl);
    onChange(name, null);
    trigger(name);
  }

  return (
    imageUrl ?
      <div
        className={`h-20 flex justify-end overflow-hidden rounded-lg shadow-sm bg-secondary bg-cover bg-center bg-no-repeat hover:h-32 ease-in duration-300`}
        style={{ backgroundImage: `url(${imageUrl})` }}
        data-testid="milestone"
      >
        <div className="btn btn-secondary basis-1/6 h-full" onClick={() => handleDelete(imageUrl)}>
          <TrashIcon className="h-6 w-6" />
        </div>
      </div> :
      <>
        <input
          type="hidden"
          {...register(name, { required: required && 'This field is required' })}
          data-testid="source-input"
        />
        <div className="form-control">
          <label className="label" htmlFor={name}>
            <span className="text-label">
              {label}
              {required && ' *'}
            </span>
          </label>
          <input
            type="file"
            id={name}
            className="file-input file-input-md file-input-bordered file-input-secondary"
            onChange={handleChange}
            required={required}
            data-testid="input-file"
            accept="image/*"
          />
          <InputValidationError error={error} />
        </div>
      </>
  );
}

export default FileInput;
