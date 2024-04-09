import z from "zod";

export const isPasswordStrength = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(24),
});

export type ILoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(24),
    confirmPassword: z.string().min(8).max(24),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["password"],
  })
  .superRefine(({ password }, ctx) => {
    if (!isPasswordStrength(password)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }
  });

export type IRegisterSchema = z.infer<typeof registerSchema>;

export const verifyEmailSchema = z.object({
  code: z.string().length(6, "Code must be 6 characters long"),
});

export type IVerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export const resetPasswordForm = z.object({
  email: z.string().email(),
});

export type IResetPasswordForm = z.infer<typeof resetPasswordForm>;

export const newPasswordForm = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    code: z.string().length(6, "Code must be 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["password"],
  })
  .superRefine(({ password }, ctx) => {
    if (!isPasswordStrength(password)) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }
  });

export type INewPasswordForm = z.infer<typeof newPasswordForm>;
