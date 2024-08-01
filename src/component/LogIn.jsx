import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

// import { auth, provider } from "../firebase.config";

export default function LogIn({ setIsAuth }) {
  let navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
        toast.success(`welcome ${user.displayName} to our MiniBlog`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="bg-emerald-600 text-yellow-50 text-center rounded-lg flex justify-center flex-col gap-10 p-20 w-fit mx-auto">
      <h1>LOGIN</h1>
      <hr />
      <button
        onClick={signInWithGoogle}
        className="btn btn-outline btn-warning text-yellow-500 rounded-full"
      >
        <FcGoogle className="bg-yellow-50 rounded-3xl" /> Signin with Google
      </button>
    </div>
  );
}
