import styles from './ChallengeInputValidationError.module.scss';

export interface InputValidationErrorProps {
  error?: string;
}

export function InputValidationError({error}: InputValidationErrorProps) {
  return <span className="block text-xs text-accent-focus pt-2 h-6" data-testid="input-validation-error">{error || null}</span>;
}

export default InputValidationError;
