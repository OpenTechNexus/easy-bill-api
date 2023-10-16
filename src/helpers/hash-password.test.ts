import {hashPassword} from './hash-password';

describe('hashPassword', () => {
  it('should hash the password', async () => {
    const password = 'password123';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
  });
});
