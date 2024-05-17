/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
import * as api from "@/api";
import { loginInput } from "@/pages/Login";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import { registerInput } from "@/pages/Register";

type AuthContextProps = {
  children: React.ReactNode;
};

type User = {
  _id: string;
  firstname: string;
  email: string;
};

type AuthContext = {
  user: User | null;
  loading: boolean;
  login: (formData: loginInput, navigate: NavigateFunction) => Promise<void>;
  register: (formData: registerInput, navigate: NavigateFunction) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);

  const login = async (formData: loginInput, navigate: NavigateFunction) => {
    setLoading(true);
    try {
      const { data } = await api.login(formData);
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);

      navigate("/reviews");
    } catch (error: any) {
      const err =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(err);
    }
    setLoading(false);
  };

  const register = async (formData: registerInput, navigate: NavigateFunction) => {
    setLoading(true);
    try {
      const { data } = await api.register(formData);

      if (data.success) {
        navigate("/login");
        toast.success("Registration successful");
      }
    } catch (error: any) {
      const err =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error);

      toast.error(err);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext not in provider");
  }

  return context;
};

export default AuthProvider;
