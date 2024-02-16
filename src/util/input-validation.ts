import { z } from "zod";

export function isValidLogin(login: string) {
  const loginSchema = z
    .string()
    .min(3)
    .max(50)
    .regex(/^[A-Za-z0-9]+$/, "Login must only contain alphanumeric characters");

  return loginSchema.safeParse(login).success;
}

export function isValidEmail(email: string) {
  const emailSchema = z.string().email();
  return emailSchema.safeParse(email).success;
}

export function isValidPassword(password: string) {
  const passwordSchema = z
    .string()
    .min(6)
    .max(72)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@<>'$^+#~!%*=?/;:_&|()+-])[A-Za-z\d@<>'$^+#~!%*=?/;:_&|()+-]+$/);

  return passwordSchema.safeParse(password).success;
}
