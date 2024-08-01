import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navigation({ isAuth, setIsAuth }) {
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
      toast.success("See You Soon! Bye");
    });
  };
  return (
    <div className="fixed top-0 left-0 w-full basis-0 ">
      <div>
        <div className="navbar bg-emerald-600 text-yellow-50">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl">
              MiniBlog
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{isAuth && <Link to="/addpost">Add Post</Link>}</li>
            </ul>
          </div>
          <div className="navbar-end">
            {!isAuth ? (
              <Link
                to="/login"
                className="btn btn-sm btn-outline btn-warning rounded-full me-5 my-auto"
              >
                Log in
              </Link>
            ) : (
              <button
                onClick={signUserOut}
                className="btn btn-sm btn-outline btn-warning rounded-full me-5 my-auto"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
