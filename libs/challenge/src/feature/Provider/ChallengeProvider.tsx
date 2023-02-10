import ChallengeForm from '../Form/ChallengeForm';
import { createContext, useContext, useState } from 'react';
import { Challenge } from '../../typings';
import { addDocument, queryDocuments } from '@challenger/shared/data-access/ddbb';
import { WhereFilterOp } from 'firebase/firestore';

export interface ChallengeProviderProps {
  children: React.ReactNode;
}

export interface ChallengeContext {
  create: () => void;
  // TODO: type this
  get: (queryKey?: string, queryValue?: string, queryOperator?: WhereFilterOp) => Promise<any>;
}

const ChallengeContext = createContext<ChallengeContext | undefined>(undefined);

export const useChallenge = (): ChallengeContext => {
  const context = useContext(ChallengeContext);

  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }

  return context;
};

export const ChallengeProvider = ({ children }: ChallengeProviderProps) => {
  const [showForm, setShowForm] = useState(false);

  const create = () => {
    setShowForm(true);
  };
  const save = async (challenge: Partial<Challenge>) => {
    return addDocument('challenges', challenge).catch((error) =>
      console.error('Error adding document: ', error)
    );
  };
  const get = async (queryKey?: string, queryValue?: string, queryOperator?: WhereFilterOp ) => {
    return queryDocuments('challenges', queryKey, queryValue, queryOperator).catch((error) =>
      console.error('Error querying documents: ', error)
    );
  };

  return (
    <ChallengeContext.Provider value={{ create, get }}>
      {children}
      <ChallengeForm
        show={showForm}
        onSubmit={save}
        onClose={() => setShowForm(false)}
      />
    </ChallengeContext.Provider>
  );
}

export default ChallengeProvider;

