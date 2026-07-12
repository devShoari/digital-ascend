import type { AuthResult, User } from "./types";
import { demoUser, findUserByEmail, mockUsersDb } from "./users";

// Demo credentials shown in the login UI. Any other e-mail/password pair
// is treated as "not registered" so the register flow has somewhere to go.
export const DEMO_CREDENTIALS = { email: demoUser.email, password: "Password123!" };

function delay<T>(value: T, ms = 900): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function isValidPassword(password: string) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

export async function loginRequest(email: string, password: string): Promise<AuthResult> {
  await delay(null, 1100);
  const user = findUserByEmail(email);
  if (!user) return { ok: false, error: "حسابی با این ایمیل پیدا نشد." };
  if (email === DEMO_CREDENTIALS.email && password !== DEMO_CREDENTIALS.password) {
    return { ok: false, error: "رمز عبور اشتباه است." };
  }
  return { ok: true, user };
}

export async function registerRequest(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  await delay(null, 1100);
  if (findUserByEmail(input.email)) {
    return { ok: false, error: "این ایمیل قبلاً ثبت شده است." };
  }
  if (!isValidPassword(input.password)) {
    return { ok: false, error: "رمز عبور باید حداقل ۸ کاراکتر و شامل حرف و عدد باشد." };
  }
  const newUser: User = {
    id: `u_${Math.floor(Math.random() * 100000)}`,
    name: input.name,
    email: input.email,
    role: "عضو تیم",
    title: "عضو جدید تیم",
    skills: [],
    joinedAt: new Date().toISOString(),
    emailVerified: false,
  };
  mockUsersDb.push(newUser);
  return { ok: true, user: newUser };
}

export async function requestPasswordReset(email: string): Promise<{ ok: boolean; error?: string }> {
  await delay(null, 900);
  if (!findUserByEmail(email)) {
    // Intentionally still "succeed" from the UI's point of view for privacy —
    // this mirrors how most real APIs avoid leaking which e-mails exist.
    return { ok: true };
  }
  return { ok: true };
}

export async function resetPasswordRequest(
  _token: string,
  newPassword: string,
): Promise<{ ok: boolean; error?: string }> {
  await delay(null, 900);
  if (!isValidPassword(newPassword)) {
    return { ok: false, error: "رمز عبور باید حداقل ۸ کاراکتر و شامل حرف و عدد باشد." };
  }
  return { ok: true };
}

export async function verifyEmailRequest(_code: string): Promise<{ ok: boolean; error?: string }> {
  await delay(null, 1200);
  if (_code.length !== 6) return { ok: false, error: "کد وارد شده معتبر نیست." };
  return { ok: true };
}

export async function resendVerificationEmail(): Promise<{ ok: boolean }> {
  await delay(null, 700);
  return { ok: true };
}
