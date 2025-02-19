import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useState } from "react";
import { createAuthApi } from "@/api/auth/authApi";
import {
  RegisterCredentials,
  RegisterResponse,
  ErrorResponse,
} from "@/api/auth/authTypes";

export const useRegister = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const { registerApi } = createAuthApi();

  const navigate = useNavigate();

  const { mutate, isPending, isSuccess, error } = useMutation<
    RegisterResponse,
    AxiosError<ErrorResponse>,
    RegisterCredentials
  >({
    mutationFn: registerApi,
    onSuccess: () => {
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    },
    onError: (error) => {
      if (!error.response) {
        return "No Server Response";
      }
      if (error.response.status === 409) {
        return "Username Taken";
      }
      return error.response.data?.message || "Registration Failed";
    },
  });

  return {
    register: mutate,
    isPending,
    isSuccess,
    error,
    user,
    setUser,
    email,
    setEmail,
    pwd,
    setPwd,
    matchPwd,
    setMatchPwd,
  };
};
