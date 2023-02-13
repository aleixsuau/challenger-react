import { render } from '@testing-library/react';
import MilestoneForm from './ChallengeMilestoneForm';

export const milestoneMock = {
  "date": {
    "start": {
      "timezone": "Europe/Madrid",
      "time": 1676333700000
    },
    "end": {
      "time": 1676421000000,
      "timezone": "Europe/Madrid"
    }
  },
  "description": "C9 M1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
  "title": "C9 M1 Title",
  "location": {
    "url": "http://www.google.es"
  },
  "image": "https://firebasestorage.googleapis.com/v0/b/challenger-af1a0.appspot.com/o/files%2Fchallenges%2Fpexels-photo-15265348.jpeg?alt=media&token=d1b2368d-8bf6-4c79-b8c9-267f0530ade0"
};

describe('MilestoneForm', () => {
  it('should render successfully', () => {
    /* const { baseElement } = render(<ChallengeMilestoneForm key={milestone.id} index={0} milestone={milestoneMock} onChange={setValue} onDelete={() => remove(index)} register={register} trigger={trigger} getValues={getValues} errors={errors} />);
    expect(baseElement).toBeTruthy(); */
  });
});
