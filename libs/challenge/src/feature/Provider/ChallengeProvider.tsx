import ChallengeForm from '../Form/ChallengeForm';
import { createContext, useContext } from 'react';
import { Challenge } from '../../typings';
import { setDocument, queryDocuments } from '@challenger/shared/data-access/ddbb';
import { useDialog } from '@challenger/shared/ui';
import { useState, useEffect } from 'react';
import ChallengeDetail from '../../ui/Detail/ChallengeDetail';
import { useAuth } from '@challenger/shared/auth';
import { ChallengeContextAPI, ChallengeProviderProps, ChallengesQuery } from './typings';

const ChallengeContext = createContext<ChallengeContextAPI | undefined>(undefined);

export const useChallenge = (): ChallengeContextAPI => {
  const context = useContext(ChallengeContext);

  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }

  return context;
};

export const ChallengeProvider = ({ children }: ChallengeProviderProps) => {
  const {user} = useAuth();
  const {openDialog, closeDialog} = useDialog();
  const {challenges, getChallenges} = _useChallenges();

  const showChallenge = (challenge: Challenge) => {
    openDialog(<ChallengeDetail challenge={challenge} />);
  };
  
  const createChallenge = () => {
    openDialog(<ChallengeForm onSubmit={saveChallenge} onCancel={closeDialog} />, 'Create challenge');
  };

  const editChallenge = (challenge: Challenge) => {
    if (!canEditChallenge(challenge)) { return; }

    openDialog(<ChallengeForm onSubmit={saveChallenge} onCancel={closeDialog} challenge={challenge} />, 'Edit challenge');
  };

  const takeChallenge = (challengeId: string): Promise<void> => {
    if (!canTakeChallenge(challengeId)) { return Promise.reject("Can't take challenge"); }

    return fetch("https://us-central1-challenger-af1a0.cloudfunctions.net/api/takeChallenge", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        userId: user?.uid,
        challengeId
      })
    })
    .then(() => getChallenges())
    .catch((error) => console.error('Error taking challenge: ', error));
  };

  const saveChallenge = (challenge: Partial<Challenge>) => {
    return setDocument('challenges', challenge)
      .then(() => getChallenges())
      .then(() => closeDialog())
      .catch((error) =>
        console.error('Error adding document: ', error)
      );
  };

  const canEditChallenge = (challenge: Challenge) => {
    return challenge.host?.uid === user?.uid;
  };

  const canTakeChallenge = (challengeId: string): boolean => {
    if (!user || !challengeId) { return false; }

    const challenge = challenges?.find((challenge) => challenge.id === challengeId);

    return challenge && !challenge?.players?.includes(user?.uid) || false;
  }

  return (
    <ChallengeContext.Provider value={{ challenges, getChallenges, createChallenge, editChallenge, showChallenge, takeChallenge, canEditChallenge, canTakeChallenge }}>
      {children}      
    </ChallengeContext.Provider>
  );
}

export default ChallengeProvider;

const _useChallenges = () => {
  const [challengesQuery, setChallengesQuery] = useState<ChallengesQuery | undefined>(undefined);
  const [challenges, setChallenges] = useState<Challenge[] | undefined>(undefined);

  useEffect(() => {
    queryDocuments<Challenge>('challenges', challengesQuery?.key, challengesQuery?.operator, challengesQuery?.value)
      .then((challengesData) => setChallenges(challengesData));
  }, [challengesQuery]);

  return { challenges, getChallenges: (query: ChallengesQuery = {}) => setChallengesQuery(query) };
}


