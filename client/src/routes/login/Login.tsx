import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiRequest from "../../api/apiRequest";
import { Helmet } from "react-helmet-async";
import LoadingIndicator from "@/components/LoadingIndicator";
import AuthContext from "@/context/authContext";

const LOGIN_URL = "/auth/login";

interface LoginResponse {
  accessToken: string;
}

interface LoginCredentials {
  user: string;
  pwd: string;
}

interface ErrorResponse {
  message: string;
}

const Login = () => {
  const { setToken, setPersist } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginCredentials
  >({
    mutationFn: async (credentials) => {
      const response = await apiRequest.post<LoginResponse>(
        LOGIN_URL,
        JSON.stringify(credentials),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      setPersist(true);
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    },
    onError: (error) => {
      errRef.current?.focus();
      return error.response?.data?.message ?? "Login Failed";
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ user, pwd });
  };

  if (loginMutation.isPending) return <LoadingIndicator />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <Helmet>
        <title>Logowanie | H Meble</title>
        <meta
          name="description"
          content="Zaloguj się do swojego konta w H Meble. Bezpieczny dostęp do historii zamówień, zapisanych projektów i personalizowanych ustawień. Dołącz do naszej społeczności."
        />
      </Helmet>
      <section className="w-full max-w-[420px] min-h-[400px] flex flex-col justify-start p-4 bg-black text-white">
        <p
          ref={errRef}
          className={
            loginMutation.error
              ? "bg-pink-400 text-red-700 font-bold p-2 mb-2"
              : "absolute -left-[9999px]"
          }
          aria-live="assertive"
        >
          {loginMutation.error?.response?.data?.message || "Login Failed"}
        </p>
        <h1>Zaloguj się</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-evenly grow pb-4"
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="mt-4 mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="text-[1.4rem] p-1 rounded-[.5rem] text-black"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mt-4 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="text-[1.4rem] p-1 rounded-[.5rem] text-black"
            />
          </div>
          <button
            className="border-2 border-white py-2 mt-5 hover:bg-white hover:text-black font-semibold"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link to="/register" className="hover:underline">
              Sign Up
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
