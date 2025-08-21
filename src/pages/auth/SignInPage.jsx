import { darkLogo } from "@/assets";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { setUserInfo } from "../../redux/amazonSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassErr] = useState("");
  const [genericErr, setGenericErr] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
    setUserEmailErr("");
    setGenericErr("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
    setUserPassErr("");
    setGenericErr("");
  };

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setErrEmail("");
    setErrPassword("");
    setUserEmailErr("");
    setUserPassErr("");
    setGenericErr("");

    let valid = true;
    if (!email) {
      setErrEmail("Enter your email");
      valid = false;
    } else if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
      valid = false;
    }

    if (!password) {
      setErrPassword("Enter your password");
      valid = false;
    } else if (password.length < 6) {
      setErrPassword("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUserInfo({
            _id: user.uid,
            userName: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );

        setLoading(false);
        setSuccessMsg("Logged in Successfully! Welcome back!");

        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;

        if (errorCode === "auth/invalid-email") {
          setUserEmailErr("Invalid email address");
        } else if (errorCode === "auth/wrong-password") {
          setUserPassErr("Wrong password! Try again.");
        } else if (errorCode === "auth/user-not-found") {
          setUserEmailErr("No account found with this email");
        } else if (errorCode === "auth/invalid-credential") {
          setGenericErr("Invalid email or password. Try again.");
        } else {
          setGenericErr("Something went wrong. Please try again.");
          console.log("Login error:", errorCode);
        }
      });
  };

  return (
    <div className="w-full">
      <div className="w-[350px] mx-auto bg-gray-100 pb-10">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2">
              {successMsg}
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col items-center">
            <img src={darkLogo} alt="Logo" className="w-32" />
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4">
                Sign In
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">
                    Email or mobile phone number
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    type="email"
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base 
                    rounded-sm outline-none focus-within:border-[#e77600]
                    focus-within:shadow-amazonInput duration-100"
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibold -mt-1.5">
                      {errEmail}
                    </p>
                  )}
                  {userEmailErr && (
                    <p className="text-red-600 text-xs font-semibold -mt-1.5">
                      {userEmailErr}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Password</p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    type="password"
                    className="w-full py-1 border border-zinc-400 px-2 text-base 
                    rounded-sm outline-none focus-within:border-[#e77600]
                    focus-within:shadow-amazonInput duration-100"
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibold -mt-1.5">
                      {errPassword}
                    </p>
                  )}
                  {userPassErr && (
                    <p className="text-red-600 text-xs font-semibold -mt-1.5">
                      {userPassErr}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 text-sm font-normal rounded-sm
                  bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b 
                  border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                >
                  Continue
                </button>

                {loading && (
                  <div className="flex justify-center mt-2">
                    <RotatingLines
                      visible={true}
                      height="40"
                      width="40"
                      color="#febd69"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                    />
                  </div>
                )}

                {genericErr && (
                  <p className="text-red-600 text-xs font-semibold mt-2 text-center">
                    {genericErr}
                  </p>
                )}
              </div>

              <p className="text-xs text-black leading-4 mt-4">
                By Continuing, you agree with Amazon's{" "}
                <span className="text-blue-600">Conditions of Use</span> and{" "}
                <span className="text-blue-600">Privacy Notice.</span>
              </p>
              <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
                <ArrowRightIcon />
                <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                  Need help?
                </span>
              </p>
            </div>

            <div className="w-full text-xs text-gray-600 mt-4 flex items-center gap-2">
              <span className="flex-1 h-[1px] bg-zinc-400"></span>
              <span className="px-2">New to Amazon?</span>
              <span className="flex-1 h-[1px] bg-zinc-400"></span>
            </div>

            <Link className="w-full text-black" to="/auth/signup">
              <button
                type="button"
                className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm
                bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b 
                border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Create your Amazon Account
              </button>
            </Link>
          </form>
        )}
      </div>

      <div className="w-full min-h-[370px] bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2025, ReactBd.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
