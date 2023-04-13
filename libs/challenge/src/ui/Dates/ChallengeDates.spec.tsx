import { render } from '@testing-library/react';
import ChallengeDates from './ChallengeDates';

describe('ChallengeDates', () => {
  const startDate = { time: 1677366907362, timezone: 'Europe/Madrid' };
  const endDate = { time: 1677539723183, timezone: 'Europe/Madrid' };

  it('should render start and end date by default', () => {
    const { getByTestId } = render(<ChallengeDates start={startDate} end={endDate}/>);

    expect(getByTestId('milestone-date-start').textContent).toBe('2023/02/26 - 00:15h');
    expect(getByTestId('milestone-date-end').textContent).toBe('2023/02/28 - 00:15h');
  });

  it('should render start date in "short" version', () => {
    const { getByTestId, queryByTestId } = render(<ChallengeDates start={startDate} end={endDate} short />);

    expect(getByTestId('milestone-date-start').textContent).toBe('2023/02/26 - 00:15h');
    expect(queryByTestId('milestone-date-end')).toBeNull();
  });
});
