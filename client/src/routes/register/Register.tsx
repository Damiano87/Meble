import { useRef, useState, useEffect } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useRegister } from "@/hooks/auth/useRegister";
import MetaData from "@/components/Meta";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const {
    register,
    isPending,
    error,
    isSuccess,
    user,
    setUser,
    email,
    setEmail,
    pwd,
    setPwd,
    matchPwd,
    setMatchPwd,
  } = useRegister();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validEmail, setValidEmail] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      return;
    }
    register({ user, email, pwd });
  };

  if (isPending) return <LoadingIndicator />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <MetaData
        title="Zarejestruj się"
        content="Rejestracja do serwisu H Meble"
      />
      {isSuccess ? (
        <section className="w-full max-w-[420px] min-h-[400px] flex flex-col justify-start p-4 bg-black text-white">
          <h1>Success!</h1>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
        </section>
      ) : (
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
            {error?.response?.data?.message || "Registration Failed"}
          </p>
          <h1>Register</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-evenly grow pb-4"
          >
            {/* username input */}
            <label htmlFor="username" className="mt-4 mb-2 flex items-center">
              Username:
              <FaCheck
                className={validName ? "text-lime-400 ml-1" : "hidden"}
              />
              <FaTimes
                className={validName || !user ? "hidden" : "text-red-600 ml-1"}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="text-[1.4rem] p-1 rounded-[.5rem] text-black"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? "relative -bottom-[10px] text-[.75rem] text-white p-1 rounded-[.5rem] bg-black "
                  : "absolute -left-[9999px]"
              }
            >
              <CiCircleInfo />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* email input */}
            <label htmlFor="email" className="mt-4 mb-2 flex items-center">
              Email:
              <FaCheck
                className={validEmail ? "text-lime-400 ml-1" : "hidden"}
              />
              <FaTimes
                className={
                  validEmail || !email ? "hidden" : "text-red-600 ml-1"
                }
              />
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="text-[1.4rem] p-1 rounded-[.5rem] text-black"
            />

            {/* password input */}
            <label htmlFor="password" className="mt-4 mb-2 flex items-center">
              Password:
              <FaCheck className={validPwd ? "text-lime-400 ml-1" : "hidden"} />
              <FaTimes
                className={validPwd || !pwd ? "hidden" : "text-red-600 ml-1"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="text-[1.4rem] p-1 rounded-[.5rem] text-black"
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd
                  ? "relative -bottom-[10px] text-[.75rem] text-white p-1 rounded-[.5rem] bg-black "
                  : "absolute -left-[9999px]"
              }
            >
              <CiCircleInfo />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            {/* confirm password input */}
            <label
              htmlFor="confirm_pwd"
              className="mt-4 mb-2 flex items-center"
            >
              Confirm Password:
              <FaCheck
                className={
                  validMatch && matchPwd ? "text-lime-400 ml-1" : "hidden"
                }
              />
              <FaTimes
                className={
                  validMatch || !matchPwd ? "hidden" : "text-red-600 ml-1"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="text-[1.4rem] p-1 rounded-[.5rem] text-black"
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? "relative -bottom-[10px] text-[.75rem] text-white p-1 rounded-[.5rem] bg-black "
                  : "absolute -left-[9999px]"
              }
            >
              <CiCircleInfo />
              Must match the first password input field.
            </p>

            <button
              disabled={
                !validName ||
                !validEmail ||
                !validPwd ||
                !validMatch ||
                isPending
              }
              className="mt-7 p-2 border-2 cursor-pointer font-semibold hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="inline-block">
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Register;
