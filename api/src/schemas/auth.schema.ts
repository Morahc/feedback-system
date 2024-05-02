import { object, string, TypeOf } from "zod";

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password too short - should be 8 chars minimum"),
  }),
});

export const createUserSchema = object({
  body: object({
    fullname: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password too short - should be 8 characters minimum"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>;