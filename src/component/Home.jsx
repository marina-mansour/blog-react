import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import { CiEdit } from "react-icons/ci";
// import { MdOutlineEdit } from "react-icons/md";
import Trash from "../icons/Trash";
import Edit from "../icons/Edit";
import Add from "../icons/Add";

import { toast } from "react-toastify";

export default function Home({
  isAuth,
  postList,
  setPostList,
  setEditMood,
  blogPost,
  setBlogPost,
  imageUpload,
  setImageUpload,
  id,
  setId,
}) {
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  const postsCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
    // console.log(postList);
  };

  const deletePost = async (id) => {
    const toDeletePost = doc(db, "posts", id);
    await deleteDoc(toDeletePost);
    getPosts();
    toast.success("Post Deleted Successfully!");
  };

  const handleEdit = async (id, title, text, image) => {
    setBlogPost({ ...blogPost, title: title, postText: text });
    setImageUpload(image);
    setId(id);
    setEditMood(true);
    navigate("/addpost");
    // console.log(id, title, text, image);
  };

  const handleAdd = () => {
    navigate("/addpost");
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log(postList);
  }, [postList]);

  if (loading)
    return (
      <div className="text-emerald- text-xl">
        <ClipLoader color="#059669" loading={loading} size={50} />
      </div>
    );
  if (postList.length == 0)
    return (
      <div className="text-emerald-900 text-xl">
        No Posts to Show, Please Add New Post
      </div>
    );
  return (
    <div className="mt-20 text-emerald-900">
      {postList.map((post) => (
        <div
          key={post.id}
          className="container mx-auto p-4 flex flex-col items-center"
        >
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-96 overflow-hidden flex flex-col justify-center gap-3">
            <div className="flex justify-between">
              <span className="font-bold text-xl">{post.blogPost.title}</span>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <div>
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    <Trash />
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(
                        post.id,
                        post.blogPost.title,
                        post.blogPost.postText,
                        post.imageUpload
                      );
                    }}
                  >
                    <Edit />
                  </button>
                </div>
              )}
            </div>
            <div className="text-lg">{post.blogPost.postText}</div>

            <img src={post.imageUpload} alt="image" />
            <br />
            <hr />
            <div className="font-bold text-s">@{post.author.name}</div>
          </div>
        </div>
      ))}
      {isAuth && (
        <button
          onClick={handleAdd}
          className="btn btn-success btn-circle bg-emerald-600 fixed bottom-4 right-4"
        >
          <Add />
        </button>
      )}
    </div>
  );
}

{
  /* {imageUpload !=
            "https://firebasestorage.googleapis.com/v0/b/blog-2ed7f.appspot.com/o/images%2Fundefined35454b58-2610-4ada-8dac-53e5529b69c9?alt=media&token=04658bb8-0c22-4358-812b-f1bcc437723c" ? (
              <div>
                <img src={post.imageUpload} alt="image" />
                <br />
              </div>
            ) : (
              <br />
            )} */
}
