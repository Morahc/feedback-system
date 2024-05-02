import { Schema, model, Model } from "mongoose";

export interface Review {
  description: string;
  rating: number;
}


type ReviewModal = Model<Review>;

const reviewSchema = new Schema<Review, ReviewModal>(
  {
    description: { type: String, required: true },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);


const ReviewModal = model<Review, ReviewModal>("Review", reviewSchema);

export default ReviewModal;
