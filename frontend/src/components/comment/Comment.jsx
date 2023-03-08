import {useContext, useState} from "react";

import {deleteComment} from "../../api/CommentController";
import Message from "../Message.jsx";
import DropdownMenu from "../DropdownMenu.jsx";
import CommentForm from "./CommentForm.jsx";
import UserContext from "../../UserContext";


const Comment = ({comment, commentsIndex, replaceComment, removeComment}) => {
  const [editing, setEditing] = useState(false);

  const {user} = useContext(UserContext);

  //Display comment form
  const editComment = () => {
    setEditing(true);
  };


  //Close editing comment form and have parent update it in comments list
  const finishEditing = (newComment) => {
    if (newComment) {
      replaceComment(commentsIndex, newComment);
    }

    setEditing(false);
  };

  //Delete comment and tell parent to remove from list
  const handleDelete = () => {
    deleteComment(comment).then(() => {
      removeComment(commentsIndex);
    });
  };

  return (
    <div className={"comment hoverable hoverMenu"}>
      {/*Display comment options dropdown menu for the comment owner*/}
      {
        user?._id === comment.user._id &&
        <div className={"commentHeader"}>
          <DropdownMenu editComponent={editComment} deleteComponent={handleDelete}/>
        </div>
      }

      {/*Comment content*/}
      <Message user={comment.user} dates={comment.dates}
        content={editing ? <CommentForm comment={comment} closeForm={finishEditing}/> : comment.content}/>
    </div>
  );
};


export default Comment;