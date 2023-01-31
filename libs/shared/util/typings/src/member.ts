export interface Member {
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: number;
  photoURL: string;
  providerData: MemberProviderData;
  uid: string;
}

export interface MemberProviderData {
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  uid: string;
}