import { WhereFilterOp } from "firebase/firestore";
import { Challenge } from "../../typings";

export interface ChallengeProviderProps {
  children: React.ReactNode;
}

export interface ChallengeContextAPI {
  challenges?: Challenge[];
  createChallenge: () => void;
  editChallenge: (challenge: Challenge) => void;
  showChallenge: (challenge: Challenge) => void;
  getChallenges: (query?: ChallengesQuery) => void;
  takeChallenge: (challengeId: string) => Promise<void>;
  canEditChallenge: (challenge: Challenge) => boolean;
  canTakeChallenge: (challengeId: string) => boolean;
}

export interface ChallengesQuery {
  key?: string;
  value?: string | number | boolean;
  operator?: WhereFilterOp;
}
