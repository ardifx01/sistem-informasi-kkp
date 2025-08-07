import z from "zod";

export const formSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});
