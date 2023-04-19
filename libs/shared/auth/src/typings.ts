import { UserInfo } from 'firebase/auth';

export interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface AuthProviderAPI {
  user: Member | null;
  loginWithGoogle: () => void;
  logout: () => void;
}

export interface Member extends UserInfo {
  readonly emailVerified: boolean;
  readonly providerData: UserInfo[];
  readonly token: string;
}

export interface MemberProviderData {
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  uid: string;
}
