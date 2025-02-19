import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";
import { AxiosError } from "axios";
import AuthContext from "@/context/authContext";
import { useContext, useState, useEffect, useRef } from "react";
import { createAuthApi } from "@/api/auth/authApi";
import {
  LoginResponse,
  ErrorResponse,
  LoginCredentials,
} from "@/api/auth/authTypes";

export const useLogin = () => {
  const { setToken, setPersist } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const { loginApi } = createAuthApi();

  const from = location.state?.from || "/";

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const { mutate, isPending, error } = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginCredentials
  >({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.accessToken);
      setPersist(true);
      setUser("");
      setPwd("");
      navigate(from);
    },
    onError: (error) => {
      errRef.current?.focus();
      return error.response?.data?.message ?? "Login Failed";
    },
  });

  return {
    login: mutate,
    isPending,
    error,
    userRef,
    errRef,
    user,
    setUser,
    pwd,
    setPwd,
  };
};
