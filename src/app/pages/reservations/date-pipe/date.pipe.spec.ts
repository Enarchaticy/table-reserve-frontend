import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });

  it('tansform to the right date or day', () => {
    const pipe = new DatePipe();
    expect(pipe.transform(pipe.getRealIsoDate())).toBe('ma');
    expect(pipe.transform(pipe.getRealIsoDate(new Date('2020-04-09')))).toBe('2020-04-09');
    expect(pipe.transform(pipe.getRealIsoDate(new Date(new Date().setDate(new Date().getDate() + 1))))).toBe('holnap');
    expect(pipe.transform(pipe.getRealIsoDate(new Date(new Date().setDate(new Date().getDate() - 1))))).toBe('tegnap');
  });

  it('checks if the two date in the same day', () => {
    const pipe = new DatePipe();
    expect(pipe.areEqualDays(new Date(), pipe.getRealIsoDate())).toBeTruthy();
    expect(
      pipe.areEqualDays(new Date(), pipe.getRealIsoDate(new Date(new Date().setDate(new Date().getDate() - 1))))
    ).toBeFalsy();
    expect(
      pipe.areEqualDays(new Date(), pipe.getRealIsoDate(new Date(new Date().setDate(new Date().getDate() + 1))))
    ).toBeFalsy();
  });
});
