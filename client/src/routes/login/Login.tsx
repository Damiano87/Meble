import { Link } from "react-router";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useLogin } from "@/hooks/auth/useLogin";
import MetaData from "@/components/Meta";

const Login = () => {
  const {
    login,
    isPending,
    error,
    user,
    pwd,
    setUser,
    setPwd,
    errRef,
    userRef,
  } = useLogin();

  // login form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ user, pwd });
  };

  if (isPending) return <LoadingIndicator />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <MetaData
        title="Logowanie | H Meble"
        content="Zaloguj się do swojego konta w H Meble. Bezpieczny dostęp do historii zamówień, zapisanych projektów i personalizowanych ustawień. Dołącz do naszej społeczności."
      />
      <section className="w-full max-w-[420px] min-h-[400px] flex flex-col justify-start p-4 bg-black text-white">
        <p
          ref={errRef}
          className={
            error
              ? "bg-pink-400 text-red-700 font-bold p-2 mb-2"
              : "absolute -left-[9999px]"
          }
          aria-live="assertive"
        >
          {error?.response?.data?.message || "Nie udało się zalogować."}
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
            disabled={isPending}
          >
            {isPending ? "Logowanie..." : "Zaloguj się"}
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
