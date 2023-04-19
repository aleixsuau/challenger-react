import { Challenge } from "./typings";
import { Member } from '@challenger/shared/auth';

export const host: Member = {
  "email": "info@macrofonoestudio.es",
  "token": "ge0orEha3A",
  "phoneNumber": null,
  "uid": "jQAjxjqmNhgMDeLkzt",
  "displayName": "Aleix Suau",
  "providerData": [
    {
      "displayName": "Aleix Suau",
      "phoneNumber": null,
      "providerId": "google.com",
      "uid": "10862",
      "photoURL": "https://lh3.googleusercontent.com/a/AGNmyxYbotGbakxQFyUfsBU7FaJg4_bKIs3cGqGxMoFH=s96-c",
      "email": "info@macrofonoestudio.es"
    }
  ],
  "providerId": "firebase",
  "emailVerified": true,
  "photoURL": "https://lh3.googleusercontent.com/a/AGNmyxYbotGbakxQFyUfsBU7FaJg4_bKIs3cGqGxMoFH=s96-c"
};

export const challengeMock: Challenge = {
  id: 'Oed1WXpaIo8PpEWQTc6d',
  milestones: [
    {
      location: {
        url: 'http://www.google.es',
      },
      title: 'C11 M1 Title',
      description:
        'C11 M1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
      image:
        'https://firebasestorage.googleapis.com/v0/b/challenger-af1a0.appspot.com/o/files%2Fchallenges%2Fpexels-photo-15265348.jpeg?alt=media&token=d1b2368d-8bf6-4c79-b8c9-267f0530ade0',
      date: {
        end: {
          time: 1676421000000,
          timezone: 'Europe/Madrid',
        },
        start: {
          timezone: 'Europe/Madrid',
          time: 1676333700000,
        },
      },
    },
    {
      title: 'C11 M2 Title',
      image:
        'https://firebasestorage.googleapis.com/v0/b/challenger-af1a0.appspot.com/o/files%2Fchallenges%2Fpexels-photo-730231.jpeg?alt=media&token=bf149ac3-03d3-4215-afe3-8f2c5937e275',
      date: {
        start: {
          time: 1676243700000,
          timezone: 'Europe/Madrid',
        },
        end: {
          timezone: 'Europe/Madrid',
          time: 1676338200000,
        },
      },
      description:
        'C11 M2  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
      location: {
        url: 'http://www.google.es',
      },
    },
    {
      location: {
        url: 'http://www.google.es',
      },
      title: 'C11 M3 Title',
      date: {
        start: {
          timezone: 'Europe/Madrid',
          time: 1676130480000,
        },
        end: {
          timezone: 'Europe/Madrid',
          time: 1676248380000,
        },
      },
      image:
        'https://firebasestorage.googleapis.com/v0/b/challenger-af1a0.appspot.com/o/files%2Fchallenges%2Fpexels-photo-15032686.jpeg?alt=media&token=5917d382-c780-4d1c-b91c-5abd7870a8c4',
      description:
        'C10 M3  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
    },
  ],
  date: {
    start: {
      time: 1675988100000,
      timezone: 'Europe/Madrid',
    },
    end: {
      time: 1676074500000,
      timezone: 'Europe/Madrid',
    },
  },
  description:
    'C11 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image:
    'https://firebasestorage.googleapis.com/v0/b/challenger-af1a0.appspot.com/o/files%2Fchallenges%2Fpexels-photo-7465050.jpeg?alt=media&token=ed679c80-f1b1-4f5b-a952-b00a41eec8a3',
  title: 'C11 Title',
  host
};

export const challengesMock: Challenge[] = [
  challengeMock,
  {
    id: '2',
    title: 'Challenge 2',
    description: 'Description 2',
    image: 'https://picsum.photos/200/300',
    date: {
      start: {
        time: 1676039465229,
        timezone: 'America/Sao_Paulo',
      },
      end: {
        time: 1676039465229,
        timezone: 'America/Sao_Paulo',
      },
    },
    milestones: [],
    host,
  },
];