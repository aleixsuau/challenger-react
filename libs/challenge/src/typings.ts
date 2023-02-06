import { Member, Image } from '@challenger/shared/util/typings';

export interface Challenge {
  uid?: string;
  host?: Member;
  title: string;
  description: string;
  milestones: Milestone[];
  date?: ChallengeDateRange;
  image?: string;
}

export interface Milestone {
  title: string;
  description: string;
  location: MilestoneLocation;
  date: ChallengeDateRange;
  badge?: string;
  image?: string;
  // TODO: Implement in phase 2
  repetition?: MilestoneRepetition;
}

export interface ChallengeDateRange {
  start: ChallengeDate;
  end: ChallengeDate;
}

export interface ChallengeDate {
  time: number;
  timezone: string;
}

export interface MilestoneRepetition {
  every: {
    interval: number;
    period:
      | MilestoneDayPeriod
      | MilestoneWeekPeriod
      | MilestoneMonthPeriod
      | MilestoneYearPeriod;
  };
  end: MilestoneRepetitionEnd;
}

export interface MilestoneDayPeriod {
  type: 'day';
}

export interface MilestoneWeekPeriod {
  type: 'week';
  day:
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';
}

export interface MilestoneMonthPeriod {
  type: 'month';
  day:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31;
}

export interface MilestoneYearPeriod {
  type: 'year';
}

export interface MilestoneLocation {
  url: string;
  // TODO: Implement in phase 2
  address?: MilestoneAddress | null;
}

export interface MilestoneAddress {
  city: string;
  country: string;
  address: string;
  map_url: string;
}

export interface MilestoneRepetitionEnd {
  never: boolean;
  date: string;
  repetitions: number;
}
