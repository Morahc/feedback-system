import * as z from "zod";

export const loginUserSchema = z
  .object({
    body: z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, "Password too short - should be 8 chars minimum"),
    }),
  })
  .strict();

export const createUserSchema = z
  .object({
    body: z.object({
      firstname: z.string({
        required_error: "Firstname is required",
      }),
      lastname: z.string({
        required_error: "Firstname is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(8, "Password too short - should be 8 characters minimum"),
    }),
  })
  .strict();

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

export type LoginUserInput = z.TypeOf<typeof loginUserSchema>;
