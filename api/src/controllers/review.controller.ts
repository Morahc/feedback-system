import { Request, Response, NextFunction } from "express";
import { ReviewInput } from "../schemas/review.schema";
import { CreateReview, GetReviews } from "../services/review.services";
import { BadRequestException } from "../exceptions";

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await GetReviews();

    return res.status(201).json({ success: true, data: reviews });
  } catch (error) {
    return next(error);
  }
};

export const create = async (
  req: Request<object, object, ReviewInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new BadRequestException("User not found");

    }
    
    const review = await CreateReview({ ...req.body, user });

    return res.status(201).json({ success: true, message: "Review created" });
  } catch (error) {
    return next(error);
  }
};
