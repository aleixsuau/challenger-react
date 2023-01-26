import { User } from 'firebase/auth';

export interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface AuthProviderAPI {
  user: User | null;
  loginWithGoogle: () => void;
  logout: () => void;
}
