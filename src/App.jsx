import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./component/Home";
import AddPost from "./component/AddPost";
import LogIn from "./component/LogIn";
import Navigation from "./component/Navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [postList, setPostList] = useState([]);
  const [editMood, setEditMood] = useState(false);
  const [blogPost, setBlogPost] = useState({
    title: "",
    postText: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [id, setId] = useState("");

  return (
    <div className="bg-yellow-50 min-h-screen w-full flex flex-col justify-center items-center ">
      <Router>
        <Navigation isAuth={isAuth} setIsAuth={setIsAuth} />
        <main className="basis-full flex justify-center items-center">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isAuth={isAuth}
                  postList={postList}
                  setPostList={setPostList}
                  setEditMood={setEditMood}
                  blogPost={blogPost}
                  setBlogPost={setBlogPost}
                  imageUpload={imageUpload}
                  setImageUpload={setImageUpload}
                  id={id}
                  setId={setId}
                />
              }
            />
            <Route
              path="addpost"
              element={
                <AddPost
                  isAuth={isAuth}
                  postList={postList}
                  setPostList={setPostList}
                  editMood={editMood}
                  setEditMood={setEditMood}
                  blogPost={blogPost}
                  setBlogPost={setBlogPost}
                  imageUpload={imageUpload}
                  setImageUpload={setImageUpload}
                  id={id}
                  setId={setId}
                />
              }
            />
            <Route path="login" element={<LogIn setIsAuth={setIsAuth} />} />
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

{
  /* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */
}
