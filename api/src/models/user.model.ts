import { Schema, model, Model } from "mongoose";
import argon from "argon2";

export interface User {
  email: string;
  password: string;
  fullname: string;
}

interface UserMethods {
  matchPassword(password: string): Promise<boolean>;
}

type UserModel = Model<User, object, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fullname: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await argon.hash(this.password);
});

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return await argon.verify(this.password, password);
};

const UserModel = model<User, UserModel>("User", userSchema);

export default UserModel;
