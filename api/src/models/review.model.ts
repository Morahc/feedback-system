import { Schema, model, Model, ObjectId } from "mongoose";

export interface Review {
  description: string;
  rating: number;
  user: ObjectId;
}

type ReviewModal = Model<Review>;

const reviewSchema = new Schema<Review, ReviewModal>(
  {
    description: { type: String, required: true },
    rating: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const ReviewModal = model<Review, ReviewModal>("Review", reviewSchema);

export default ReviewModal;
