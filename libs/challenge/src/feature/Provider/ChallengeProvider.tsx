import ChallengeForm from '../../ui/Form/ChallengeForm';
import { createContext, useContext, useState } from 'react';
import { Challenge } from '../../typings';
import { addDocument } from '@challenger/shared/data-access/ddbb';

const ChallengeContext = createContext<ChallengeContext | undefined>(undefined);

export const useChallenge = () => {
  const context = useContext(ChallengeContext);

  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }

  return context;
};

export function ChallengeProvider({ children }: ProviderProps) {
  const [showForm, setShowForm] = useState(false);

  const create = () => {
    setShowForm(true);
  };
  const save = async (challenge: Partial<Challenge>) => {
    addDocument('challenges', challenge).catch((error) =>
      console.error('Error adding document: ', error)
    );
  };

  return (
    <ChallengeContext.Provider value={{ create }}>
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

export interface ProviderProps {
  children: React.ReactNode;
}

export interface ChallengeContext {
  create: () => void;
}
