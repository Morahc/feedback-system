/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
import * as api from "@/api";
import toast from "react-hot-toast";
import { reviewInput } from "@/pages/Reviews";

type ReviewContextProps = {
  children: React.ReactNode;
};

type ReviewContext = {
  reviews: any[];
  loading: boolean;
  getReviews: () => Promise<any>;
  createReviews: (formData: reviewInput) => Promise<any>;
};

const ReviewContext = createContext<ReviewContext | null>(null);

const AuthProvider = ({ children }: ReviewContextProps) => {
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    setLoading(true);
    try {
      const { data } = await api.getReviews();

      setReviews(data.data)
    } catch (error: any) {
      const err =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(err);
    }
    setLoading(false);
  };

  const createReviews = async (formData: reviewInput) => {
    setLoading(true);
    try {
      await api.createReview(formData);

      toast.success("Review created successful");
    } catch (error: any) {
      const err =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(err);
    }
    setLoading(false);
  };

  return (
    <ReviewContext.Provider value={{ loading: isLoading, getReviews, createReviews, reviews }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviewContext not in provider");
  }

  return context;
};

export default AuthProvider;
