import { User, signInWithPopup, signOut } from "firebase/auth";

export interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface AuthProviderAPI {
  user: User | null,
  loginWithGoogle: typeof signInWithPopup,
  logout: typeof signOut,
}