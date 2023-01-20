import { render, screen } from '@testing-library/react';
import * as FirebaseAuth from 'firebase/auth';
import { AuthProvider, useAuth } from './AuthProvider';

jest.mock('firebase/auth', () => {
  const GoogleAuthProvider = jest.fn();
  const signInWithPopup = jest.fn();
  const signOut = jest.fn();
  const getAuth = jest.fn();
  const onAuthStateChanged = jest.fn((auth, callback) => callback('mockedUser'));

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
    it('should provide the current user', () => {
      function AuthConsumerComponent() {
        return (<>{useAuth().user}</>);
      }

      render(
        <AuthProvider>
          <AuthConsumerComponent></AuthConsumerComponent>
        </AuthProvider>
      );

      expect(screen.getByText('mockedUser')).toBeTruthy();
    });
  });
});
