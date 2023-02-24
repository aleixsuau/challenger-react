import ChallengeForm from '../Form/ChallengeForm';
import { createContext, useContext } from 'react';
import { Challenge } from '../../typings';
import { setDocument, queryDocuments } from '@challenger/shared/data-access/ddbb';
import { WhereFilterOp } from 'firebase/firestore';
import { useDialog } from '@challenger/shared/ui';
import { useState, useEffect } from 'react';
import ChallengeDetail from '../../ui/Detail/ChallengeDetail';
import { useAuth } from '@challenger/shared/auth';

export const useChallenge = (): ChallengeContext => {
  const context = useContext(ChallengeContext);

  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }

  return context;
};

export const ChallengeProvider = ({ children }: ChallengeProviderProps) => {  
  const {openDialog, closeDialog} = useDialog();
  const {challenges, getChallenges} = useChallenges();
  const { user } = useAuth();

  const saveChallenge = (challenge: Partial<Challenge>) => {
    return setDocument('challenges', challenge)
    .then(() => getChallenges())
    .then(() => closeDialog())
    .catch((error) =>
      console.error('Error adding document: ', error)
    );
  };

  const createChallenge = () => {
    openDialog(<ChallengeForm onSubmit={saveChallenge} onCancel={closeDialog} />, 'Create challenge');
  };

  const canEditChallenge = (challenge: Challenge) => {
    return challenge.host?.uid === user?.uid;
  };

  const editChallenge = (challenge: Challenge) => {
    if (!canEditChallenge(challenge)) { return; }

    openDialog(<ChallengeForm onSubmit={saveChallenge} onCancel={closeDialog} challenge={challenge} />, 'Edit challenge');
  };

  const showChallenge = (challenge: Challenge) => {
    openDialog(<ChallengeDetail challenge={challenge} />);
  };

  return (
    <ChallengeContext.Provider value={{ challenges, getChallenges, createChallenge, editChallenge, canEditChallenge, showChallenge }}>
      {children}      
    </ChallengeContext.Provider>
  );
}

export default ChallengeProvider;

export interface ChallengeProviderProps {
  children: React.ReactNode;
}

export interface ChallengeContext {
  challenges?: Challenge[];
  createChallenge: () => void;
  editChallenge: (challenge: Challenge) => void;
  canEditChallenge: (challenge: Challenge) => boolean;
  showChallenge: (challenge: Challenge) => void;
  getChallenges: (query?: ChallengesQuery) => void;
}

export interface ChallengesQuery {
  key?: string;
  value?: string | number | boolean;
  operator?: WhereFilterOp;
}

const ChallengeContext = createContext<ChallengeContext | undefined>(undefined);

export const useChallenges = () => {
  const [challengesQuery, setChallengesQuery] = useState<ChallengesQuery | undefined>(undefined);
  const [challenges, setChallenges] = useState<Challenge[] | undefined>(undefined);

  useEffect(() => {
    queryDocuments<Challenge>('challenges', challengesQuery?.key, challengesQuery?.operator, challengesQuery?.value)
        .then((challengesData) => setChallenges(challengesData));
  }, [challengesQuery]);

  return { challenges, getChallenges: (query: ChallengesQuery = {}) => setChallengesQuery(query) };
}



