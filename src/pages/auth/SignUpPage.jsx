import { darkLogo } from "@/assets"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {motion} from "framer-motion";
import { RotatingLines } from "react-loader-spinner";



const SignUpPage = () => {
  const navigate =useNavigate();
  const auth = getAuth();
  const [clientName, setClientName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [cPassword, setCPassword]=useState("");

  const [errClientName, setErrClientName]=useState("");
  const [errEmail, setErrEmail]=useState("");
  const [errPassword, setErrPassword]=useState("");
  const [errCPassword, setErrCPassword]=useState("");  
  const [firebaseErr, setFirebaseErr]=useState("");

  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleName=(e)=>{
    setClientName(e.target.value)
    setErrClientName("")
  }

    const handleEmail=(e)=>{
    setEmail(e.target.value)
    setErrEmail("")
  }

    const handlePassword=(e)=>{
    setPassword(e.target.value)
    setErrPassword("")
  }

    const handleCPassword=(e)=>{
    setCPassword(e.target.value)
    setErrCPassword("")
  }


  const emailValidation = (email) => {
      return String(email)
          .toLowerCase()
          .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  }


  const handleRegistration=(e)=>{
    e.preventDefault()
    if (!clientName){
      setErrClientName("Enter your name")
    }
    if (!email){
      setErrEmail("Enter your email");
      setFirebaseErr("")
    }else{
      if(!emailValidation(email)){
        setErrEmail("Enter a valid email")
      }
    }
    if (!password){
      setErrPassword("Enter your password")
    } else {
      if (password.length<6){
        setErrPassword("Password must be at least 6 characters");
      }
    }
    if (!cPassword){
      setErrCPassword("Confirm your password");
    } else {
      if(cPassword !== password){
        setErrCPassword("Password not matched")

      }
    }


  if (clientName && email && emailValidation(email) && password && password.length >= 6 && cPassword && cPassword === password) {
      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: clientName,
          photoURL:
          "https://sl.bing.net/bvFdcanc8rY"
        })
        const user = userCredential.user;
        setLoading(false);
        setSuccessMsg("Account Created Successfully");
        setTimeout(()=>{
          navigate("/auth/signin")
        }, 3000)
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode.includes("auth/email-already-in-use")) {
          setFirebaseErr("Email already in use. Try another one");
        }
      });

      setClientName("");
      setEmail("");
      setPassword("");
      setCPassword("");
      setErrCPassword("");
  }

  }


  return (
    <div className="w-full">
      <div className="w-[350px] mx-auto bg-gray-100 pb-10"> 
        <form action="" className="flex flex-col items-center">
          <img src={darkLogo} alt="Logo" className="w-32" />
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">Create Account</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col  gap-2">
                <p className="text-sm font-medium">Your name</p>
                <input onChange={handleName} value={clientName} type="text" className="w-full py-1 border border-zinc-400 px-2 text-base 
                rounded-sm outline-none focus-within:border-[#e77600]
                focus-within:shadow-amazonInput duration-100"/>
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
 {errClientName}</p>
                )}
              </div>
              <div className="flex flex-col  gap-2">
                <p className="text-sm font-medium">Email or mobile phone number</p>
                <input onChange={handleEmail} value={email} type="email" className="w-full py-1 border border-zinc-400 px-2 text-base 
                rounded-sm outline-none focus-within:border-[#e77600]
                focus-within:shadow-amazonInput duration-100"/>
                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
 {errEmail}</p>
                )}
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
 {firebaseErr}</p>
                )}
              </div>
              <div className="flex flex-col  gap-2">
                <p className="text-sm font-medium">Password</p>
                <input onChange={handlePassword} value={password} type="password" className="w-full py-1 border border-zinc-400 px-2 text-base 
                rounded-sm outline-none focus-within:border-[#e77600]
                focus-within:shadow-amazonInput duration-100"/>
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
 {errPassword}</p>
                )}
              </div>
              <div className="flex flex-col  gap-2">
                <p className="text-sm font-medium">Re-enter password</p>
                <input onChange={handleCPassword} value={cPassword} type="password" className="w-full py-1 border border-zinc-400 px-2 text-base 
                rounded-sm outline-none focus-within:border-[#e77600]
                focus-within:shadow-amazonInput duration-100"/>
                {errCPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5 ">
                    <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
 {errCPassword}</p>
                )}
                <p className="text-xs text-gray-600">Passwords must be at least 6 characters.</p>
              </div>
              <button onClick={handleRegistration} className="w-full py-1.5 text-sm  font-normal rounded-sm
              bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">Continue</button>
              {
                loading && (
                  <div className="flex justify-center ">
                    <RotatingLines
                      visible={true}
                      height="50"
                      width="50"
                      color="#febd69"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      />

                  </div>
                )
              }
              {
                successMsg && (
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center"
                  >
                    {successMsg}
                  </motion.p>
                )
              }

            </div>
            <p className="text-xs text-black leading-4 mt-4">By Continuing , you agree with Amazon's <span className="text-blue-600">Conditions of Use{" "}</span> and <span className="text-blue-600">Privace Notice.</span></p>
            <div>
              <p className="text-xs text-black">Already have have an account?{" "}
                <Link className="text-[11px]" to="/auth/signin">
                <span className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Sign In{" "}
                  <span><ArrowRightIcon /></span>
                </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2">Buying for work?{" "}
                <Link className="text-[11px]" to="/auth/signin">
                <span className="text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Create a free business account
                  <span><ArrowRightIcon /></span>
                </span>
                </Link>
              </p>
            </div>
          </div>
          
        </form>
      </div>
      <div className="w-full min-h-[370px] bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Conditions of Us</p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Privacy Notice</p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">Privacy Notice</p>
        </div>
        <p className="text-xs text-gray-600">© 1996-2023, ReactBd.com, Inc. or its affiliates</p>        
      </div>
      
    </div>
  )
}

export default SignUpPage