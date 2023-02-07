import styles from './ChallengeInputValidationError.module.scss';

/* eslint-disable-next-line */
export interface InputValidationErrorProps {
  error?: string;
}

export function InputValidationError({error}: InputValidationErrorProps) {
  return error ?
    <span className="text-sm text-accent-focus pt-2" data-testid="input-validation-error">{error}</span>
  : null;
}

export default InputValidationError;
