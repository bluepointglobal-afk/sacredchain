import { signAccessToken, verifyAccess, hashToken, randomToken } from '../utils/tokens.js';
import { registerSchema, bookingSchema } from '../validation/schemas.js';

describe('tokens', () => {
  const fakeUser = { _id: { toString: () => 'abc123' }, role: 'learner' };

  it('signs and verifies an access token round-trip', () => {
    const token = signAccessToken(fakeUser);
    const payload = verifyAccess(token);
    expect(payload.sub).toBe('abc123');
    expect(payload.role).toBe('learner');
  });

  it('hashes tokens deterministically and differently per input', () => {
    const a = randomToken();
    expect(hashToken(a)).toBe(hashToken(a));
    expect(hashToken(a)).not.toBe(hashToken(randomToken()));
  });
});

describe('validation schemas', () => {
  it('accepts a valid registration', () => {
    const r = registerSchema.safeParse({ name: 'Amina Rahman', email: 'a@b.com', password: 'password123' });
    expect(r.success).toBe(true);
  });

  it('rejects short passwords and bad emails', () => {
    expect(registerSchema.safeParse({ name: 'Amina', email: 'a@b.com', password: '123' }).success).toBe(false);
    expect(registerSchema.safeParse({ name: 'Amina', email: 'nope', password: 'password123' }).success).toBe(false);
  });

  it('requires a teacherSlug on bookings', () => {
    expect(bookingSchema.safeParse({}).success).toBe(false);
    expect(bookingSchema.safeParse({ teacherSlug: 'ahmad' }).success).toBe(true);
  });
});
