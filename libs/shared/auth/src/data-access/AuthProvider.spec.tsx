import { render } from '@testing-library/react';
import * as FirebaseAuth from 'firebase/auth';
import { Member } from '../typings';
import { AuthProvider, useAuth } from './AuthProvider';

const mockedUser: Member = {
  displayName: 'mockedDisplayName',
  email: 'mockedEmail',
  emailVerified: true,
  phoneNumber: 'mockedPhoneNumber',
  photoURL: 'mockedPhotoURL',
  providerId: 'mockedProviderId',
  providerData: [{
    displayName: 'mockedDisplayName',
  } as Member],
  uid: 'mockedUid'
};

jest.mock('firebase/auth', () => {
  const GoogleAuthProvider = jest.fn();
  const signInWithPopup = jest.fn();
  const signOut = jest.fn();
  const getAuth = jest.fn();
  const onAuthStateChanged = jest.fn((auth, callback) => callback(mockedUser));

  return {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
  };
});


describe('AuthProvider', () => {
  describe('Login', () => {
    it('should provide the loginWithGoogle method', () => {
      function AuthConsumerComponent() {
        // @ts-expect-error ignoring loginWithGoogle params to keep it simple
        useAuth().loginWithGoogle();

        return (<></>);
      }

      render(
        <AuthProvider>
          <AuthConsumerComponent></AuthConsumerComponent>
        </AuthProvider>
      );

      expect(FirebaseAuth.GoogleAuthProvider).toHaveBeenCalled();
      expect(FirebaseAuth.getAuth).toHaveBeenCalled();
      expect(FirebaseAuth.signInWithPopup).toHaveBeenCalled();
    });
  });

  describe('Logout', () => {
    it('should provide the logout method', () => {
      function AuthConsumerComponent() {
        // @ts-expect-error ignoring logout params to keep it simple
        useAuth().logout();

        return (<></>);
      }

      render(
        <AuthProvider>
          <AuthConsumerComponent></AuthConsumerComponent>
        </AuthProvider>
      );

      expect(FirebaseAuth.signOut).toHaveBeenCalled();
    });
  });

  describe('User', () => {
    it('should provide the current user', async () => {
      function AuthConsumerComponent() {
        const {user} = useAuth();

        if (!user) { return <></>};

        const { displayName, email, emailVerified, phoneNumber, photoURL, providerId, providerData, uid} =  user;
        
        return (
          <div data-testid="userData">
            <div data-testid="displayName">{displayName}</div>
            <div data-testid="email">{email}</div>
            <div data-testid="emailVerified">{emailVerified && 'true'}</div>
            <div data-testid="phoneNumber">{phoneNumber}</div>
            <div data-testid="photoURL">{photoURL}</div>
            <div data-testid="providerId">{providerId}</div>
            <div data-testid="providerData">{providerData[0].displayName}</div>
            <div data-testid="uid">{uid}</div>
          </div>
        );
      }

      const { findByTestId } = render(
        <AuthProvider>
          <AuthConsumerComponent></AuthConsumerComponent>
        </AuthProvider>
      );
      const userData = await findByTestId('userData');

      expect(userData.querySelector('[data-testid=displayName]')?.textContent).toBe(mockedUser.displayName);
      expect(userData.querySelector('[data-testid=email]')?.textContent).toBe(mockedUser.email);
      expect(userData.querySelector('[data-testid=emailVerified]')?.textContent).toBe(`${mockedUser.emailVerified}`);
      expect(userData.querySelector('[data-testid=phoneNumber]')?.textContent).toBe(mockedUser.phoneNumber);
      expect(userData.querySelector('[data-testid=photoURL]')?.textContent).toBe(mockedUser.photoURL);
      expect(userData.querySelector('[data-testid=providerId]')?.textContent).toBe(mockedUser.providerId);
      expect(userData.querySelector('[data-testid=providerData]')?.textContent).toBe(mockedUser.providerData[0].displayName);
      expect(userData.querySelector('[data-testid=uid]')?.textContent).toBe(mockedUser.uid);
    });
  });
});
