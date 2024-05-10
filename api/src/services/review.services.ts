import { Types } from "mongoose";
import ReviewModal from "../models/review.model";
import { ReviewInput } from "../schemas/review.schema";

export const GetReviews = async () => {
  return await ReviewModal.find().select("-user");
};

export const CreateReview = async (input: ReviewInput["body"] & { user: Types.ObjectId }) => {
  return await ReviewModal.create(input);
};
