import { uploadFile } from '@challenger/shared/data-access/ddbb';
import { Challenge } from '../../typings';
import InputValidationError from '../InputValidationError/ChallengeInputValidationError';
import { ChangeEvent, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import styles from './ChallengeFileInput.module.scss';

/* eslint-disable-next-line */
export interface FileInputProps {
  // TODO: type this
  label: string;
  name: any;
  register: any;
  trigger: any;
  onChange: UseFormReturn<Challenge>['setValue'];
  required?: boolean;
  error?: string;
}

export function FileInput({
  name,
  label,
  register,
  onChange,
  required,
  trigger,
  error
}: FileInputProps) {
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    const fileDDBBUrlResult = await uploadFile(file);

    onChange(name, fileDDBBUrlResult);
    trigger(name);
  };

  return (
    <>
      <input
        type="hidden"
        {...register(name, { required: required && 'This field is required' })}
        data-testid="source-input"
      />
      <label>
        <span className="input-label">
          {label}
          {required && ' *'}
        </span>
        <input
          type="file"
          className="input"
          onChange={handleChange}
          required={required}
          data-testid="input-file"
        />
        <InputValidationError error={error} />
      </label>
    </>
  );
}

export default FileInput;
