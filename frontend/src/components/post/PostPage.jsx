import {useState, useContext, useEffect, Suspense} from "react";
import {useParams} from "react-router-dom";

import {getPost, deletePost} from "../../api/PostController.js";
import Message from "../Message.jsx";
import DropdownMenu from "../DropdownMenu.jsx";
import CommentsContainer from "../comment/CommentsContainer";
import PostForm from "./PostForm";
import ModalContext from "../../ModalContext";
import UserContext from "../../UserContext";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const {id} = useParams(); //post id from url params

  const {setModal} = useContext(ModalContext);
  const {user} = useContext(UserContext);

  //Load post
  useEffect(() => {
    getPost(id).then((newPost) => {
      setPost(newPost);
    });
  }, []);

  //Open post form in modal
  const editPost = () => {
    setModal(<PostForm post={post} closePage={finishEditing}/>);
  };

  //Update post if needed and close modal
  const finishEditing = (newPost) => {
    if (newPost) {
      setPost(newPost);
    }

    setModal(null);
  };

  //Delete the post and redirect to homepage
  const handleDelete = () => {
    deletePost(post._id).then(() => {
      window.location.assign("/");
    });
  };

  return (
    <div className={"container postsFeed"}>
      {
        post &&
        <div className={"postPage"}>
          {/*Page Header*/}
          <div className={"pageHeader"}>
            <h1>{post.title}</h1>

            {
              //Display post options menu for the owner of the post
              user?._id === post.user._id &&
              <DropdownMenu editComponent={editPost} deleteComponent={handleDelete}/>
            }
          </div>

          {/*Page Body*/}
          <div className={"postBody"}>
            <Message user={post.user} content={post.content} dates={post.dates}/>

            <CommentsContainer postId={post._id}/>
          </div>
        </div>
      }
    </div>
  );
};


export default PostPage;