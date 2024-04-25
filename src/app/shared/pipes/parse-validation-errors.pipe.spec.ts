import { ParseValidationErrorsPipe } from './parse-validation-errors.pipe';

describe('ParseValidationErrorsPipe', () => {
  it('create an instance', () => {
    const pipe = new ParseValidationErrorsPipe();
    expect(pipe).toBeTruthy();
  });
});
