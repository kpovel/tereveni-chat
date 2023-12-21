import { z } from "zod";

export const validateInput = (
  inputText: string,
  type: "password" | "login" | "email",
) => {
  const patterns = {
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,72}$/,
    login: /^[A-Za-z0-9]{3,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const isValid = patterns[type].test(inputText);

  return isValid;
};

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
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/);

  return passwordSchema.safeParse(password).success;
}
