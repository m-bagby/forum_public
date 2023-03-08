import {useContext} from "react";

import DropdownMenu from "../DropdownMenu.jsx";
import UserContext from "../../UserContext.jsx";

import {formatDate} from "../../utils/Formatter.js";
import {deletePost} from "../../api/PostController.js";
import PostForm from "./PostForm";
import ModalContext from "../../ModalContext";


const PostCard = ({post, postsIndex, removePost, replacePost}) => {
  const {setModal} = useContext(ModalContext);
  const {user} = useContext(UserContext);

  //Delete post then have parent remove it from list
  const handleDelete = () => {
    deletePost(post._id).then(() => {
      if (removePost) {
        removePost(postsIndex);
      }
    });
  };

  //Open post editor
  const editPost = () => {
    setModal(<PostForm post={post} closePage={finishEditing}/>);
  };

  //Close modal and have parent replace post card if it was updated
  const finishEditing = (newPost) => {
    if (newPost && replacePost) {
      replacePost(postsIndex, newPost);
    }

    setModal(null);
  };

  //Redirect to post page
  const openPost = () => {
    window.location.assign("/post/" + post._id);
  };


  return (
    <div className={"postCard hoverShine interactive hoverMenu"} onClick={openPost}>
      {/*Card Header*/}
      <div className={"pageHeader"}>
        <a href={"/post/" + post._id} className={"postCardLink"}>
          <h2>{post.title}</h2>
        </a>

        {
          user?._id === post.user._id &&
          <DropdownMenu editComponent={editPost} deleteComponent={handleDelete}/>
        }
      </div>

      {/*Middle Section for User and content preview*/}
      <div className={"message"}>
        <div className={"messageImage"}>
          <b>
            <img className={"profilePicture"} src={post.user.image} alt={"profile picture"}/>
          </b>
        </div>

        <h3 className={"username"}>
          <b>{post.user.username}</b>
          <span style={{color: "var(--textMuted)"}}>
                :
              </span>
        </h3>

        <span className={"postCardContentPreview"}>
              {post.content}
            </span>
      </div>

      {/*Bottom Section for Post Info*/}
      <div>
            <span className={"commentsCount"}>
              {post.commentsCount} comments
            </span>
        <span className={"dateTag"}>
              {formatDate(post.dates.created)}
            </span>
      </div>
    </div>
  );
};

export default PostCard;