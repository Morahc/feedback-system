import * as z from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    description: z.string({
      required_error: "A description is required",
    }),
    rating: z.coerce
      .number({
        required_error: "A rating is required",
        invalid_type_error: "Rating must be a number",
      })
      .min(1, "A minimun rating of one is required"),
  }),
}).strict();

export type ReviewInput = z.TypeOf<typeof createReviewSchema>;
