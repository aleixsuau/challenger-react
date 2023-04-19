import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { AuthProviderAPI, AuthProviderProps } from '../typings';
import { auth } from '../../../../../firebase';
import { Member } from '../typings';

const AuthContext = createContext<AuthProviderAPI | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthtProvider');
  }

  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Member | null>(null);

  useEffect(() => {
    const unsubscribeFn = onAuthStateChanged(auth, async (user) => {
      const memberData = await getMemberData(user);

      setUser(memberData);
    });

    return unsubscribeFn;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
};

const logout = () => {
  signOut(auth);
};

const getMemberData = async (user: User | null): Promise<Member | null> => {
  if (!user) { return null };

  const {displayName, email, emailVerified, phoneNumber, photoURL, providerId, providerData, uid} = user;
  const token = await user.getIdToken();
  
  return {displayName, email, emailVerified, phoneNumber, photoURL, providerId, providerData, uid, token};
}
