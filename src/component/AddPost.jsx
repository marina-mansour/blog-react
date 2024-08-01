import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function AddPost({
  isAuth,
  postList,
  setPostList,
  editMood,
  setEditMood,
  blogPost,
  setBlogPost,
  imageUpload,
  setImageUpload,
  id,
  setId,
}) {
  // const [blogPost, setBlogPost] = useState({
  //   title: "",
  //   postText: "",
  // });
  const [imageSrc, setImageSrc] = useState(null);
  const [fill, setFill] = useState(true);
  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  // const notify = () => toast("Wow so easy!");

  const createPost = async () => {
    setFill(false);
    if (
      blogPost.title === "" ||
      blogPost.postList === "" ||
      imageUpload === null
    ) {
      console.log("all field required");
      toast.error("All Fields Required");
    } else {
      setFill(true);
      uploadImage();
      toast.success("Post Added Successfully!");
    }
  };

  const uploadImage = () => {
    const imageRef = ref(storage, `images/${imageUpload.name + uuid()}`);
    uploadBytes(imageRef, imageUpload).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        try {
          addDoc(postsCollectionRef, {
            blogPost,
            imageUpload: url,
            author: {
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid,
            },
          });
        } catch (error) {
          console.log(error);
        }
        navigate("/");
      });
    });
    setBlogPost({ title: "", postText: "" });
    setImageUpload(null);
  };

  const updatePost = async () => {
    setFill(false);
    if (
      blogPost.title === "" ||
      blogPost.postList === "" ||
      !imageUpload.name //to check user add photo to update or not
    ) {
      console.log("all required");
      toast.error("You Should Fill All Fields");
    } else {
      setFill(true);
      // console.log(imageUpload.name);
      const imageRef = ref(storage, `images/${imageUpload.name + uuid()}`);
      uploadBytes(imageRef, imageUpload).then((response) => {
        getDownloadURL(response.ref).then((url) => {
          try {
            const updateData = doc(db, "posts", id);
            updateDoc(updateData, {
              blogPost: {
                title: blogPost.title,
                postText: blogPost.postText,
              },
              imageUpload: url,
            });
          } catch (error) {
            console.log(error);
          }
          // console.log(imageUpload);
          setEditMood(false);
          navigate("/");
        });
      });
      setBlogPost({ title: "", postText: "" });
      setImageUpload(null);
      toast.success("Post Updated Successfully!");
    }
  };

  const cancelUpdate = async () => {
    setEditMood(false);
    navigate("/");
  };

  const handleImageUpload = (e) => {
    setImageUpload(e.target.files[0]);
    const img = e.target.files[0];
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(img);
    }
  };
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, []);
  return (
    <div className="text-emerald-900 mt-28 mb-10 ">
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-96 overflow-hidden flex flex-col gap-4">
        {editMood ? (
          <h1 className="text-center font-bold text-lg">Update Post</h1>
        ) : (
          <h1 className="text-center font-bold text-lg">Add New Post</h1>
        )}
        <div className="flex flex-col gap-1">
          {/* title */}
          <label className="text-lg">Title</label>
          {editMood ? (
            <input
              className="input input-warning p-2"
              type="text"
              value={blogPost.title}
              placeholder="Enter Post Title"
              onChange={(e) =>
                setBlogPost({ ...blogPost, title: e.target.value })
              }
            />
          ) : (
            <input
              className="input input-warning p-2"
              type="text"
              placeholder="Enter Post Title"
              onChange={(e) =>
                setBlogPost({ ...blogPost, title: e.target.value })
              }
            />
          )}
          {/* post content */}
          <label className="text-lg">Post</label>
          {editMood ? (
            <textarea
              className=" textarea textarea-warning p-2"
              value={blogPost.postText}
              placeholder="Write Your Post ..."
              onChange={(e) =>
                setBlogPost({ ...blogPost, postText: e.target.value })
              }
            ></textarea>
          ) : (
            <textarea
              className="textarea textarea-warning p-2"
              name=""
              id=""
              placeholder="Write Your Post ..."
              onChange={(e) =>
                setBlogPost({ ...blogPost, postText: e.target.value })
              }
            />
          )}
          {/* post image */}
          <label className="text-lg">Image</label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-warning file-input-md w-full text-emerald-900"
            onChange={handleImageUpload}
          />

          {imageSrc && (
            <div className="text-center">
              <img src={imageSrc} alt="post image" />
            </div>
          )}
        </div>
        {/* buttons */}
        {editMood ? (
          <div className="flex gap-4 justify-center">
            <button
              onClick={cancelUpdate}
              className="btn btn-outline btn-warning rounded-full px-7"
            >
              Cancel
            </button>
            <button
              onClick={updatePost}
              className="btn  btn-success rounded-full px-7 text-yellow-50"
            >
              Update
            </button>
          </div>
        ) : (
          <button
            onClick={createPost}
            className="btn btn-outline btn-success rounded-full px-7 "
          >
            Share
          </button>
        )}
      </div>
    </div>
  );
}

// const updateData = doc(db, "posts", id);
// await updateDoc(updateData, {
//   blogPost: { title: blogPost.title, postText: blogPost.postText },
//   imageUpload: imageUpload,
// });
// console.log(imageUpload);
// setEditMood(false);
// navigate("/");

// {fill || (
//   <div className=" text-xl bg-yellow-50 py-2 rounded-md shadow-md text-red-700 text-center">
//     All Fields Required
//   </div>
// )}
