import ChallengeForm from '../Form/ChallengeForm';
import { createContext, useContext } from 'react';
import { Challenge } from '../../typings';
import { addDocument, queryDocuments } from '@challenger/shared/data-access/ddbb';
import { WhereFilterOp } from 'firebase/firestore';
import { useDialog } from '@challenger/shared/ui';
import { useState, useEffect } from 'react';

export const useChallenge = (): ChallengeContext => {
  const context = useContext(ChallengeContext);

  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }

  return context;
};

export const ChallengeProvider = ({ children }: ChallengeProviderProps) => {  
  const { openDialog, closeDialog } = useDialog();
  const {challenges, getChallenges} = useChallenges();

  const saveChallenge = async (challenge: Partial<Challenge>) => {
    return addDocument('challenges', challenge)
    .then(() => closeDialog())
    .then(() => getChallenges())
    .catch((error) =>
      console.error('Error adding document: ', error)
    );
  };

  const createChallenge = () => {
    openDialog(<ChallengeForm onSubmit={saveChallenge} onCancel={closeDialog} />, 'Create challenge');
  };

  return (
    <ChallengeContext.Provider value={{ challenges, getChallenges, createChallenge }}>
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
  // TODO: type this
  getChallenges: (key?: string, operator?: WhereFilterOp, value?: string | number | boolean) => void;
}

export interface ChallengesQuery {
  key?: string;
  value?: string | number | boolean;
  operator?: WhereFilterOp;
}

const ChallengeContext = createContext<ChallengeContext | undefined>(undefined);

const useChallenges = () => {
  const [challengesQuery, setChallengesQuery] = useState<ChallengesQuery | undefined>(undefined);
  const [challenges, setChallenges] = useState<Challenge[] | undefined>(undefined);

  useEffect(() => {
    queryDocuments<Challenge>('challenges', challengesQuery?.key, challengesQuery?.operator, challengesQuery?.value)
      .then((challengesData) => setChallenges(challengesData));
  }, [challengesQuery]);

  const getChallenges = (key?: ChallengesQuery['key'], operator?: ChallengesQuery['operator'], value?: ChallengesQuery['value']) => {
    setChallengesQuery({ key, value, operator });
  };

  return { challenges, getChallenges };
}



