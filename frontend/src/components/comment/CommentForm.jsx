import {useState, useContext} from "react";

import {createComment, updateComment} from "../../api/CommentController";
import UserContext from "../../UserContext.jsx";
import LoginPrompt from "../user/LoginPrompt";


const CommentForm = ({postId, comment, closeForm}) => {
  const {user} = useContext(UserContext);

  const editing = comment ? true : false; //Whether form is editing existing comment or making a new one

  const [content, setContent] = useState(comment ? comment.content : "");

  //Update state to reflect input
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    setContent(value);
  };


  //Try to create or update comment
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    const contentSubmission = content.trim();

    if (contentSubmission.length < 1) {
      alert("Comment cannot be empty");
      valid = false;
    }

    //Create or update comment and pass the change to parent
    if (valid) {
      if (editing) {
        updateComment(comment._id, contentSubmission).then((updatedComment) => {
          closeForm(updatedComment);
        });
      }

      else {
        createComment(postId, contentSubmission, user._id).then((newComment) => {
          closeForm(newComment);

          //Make the comment box empty again
          setContent("");
        });
      }
    }
  };

  return (
    <div className={"commentFormContainer commentForm"}>
      {
        //Comment box
        user &&
        <form onSubmit={handleSubmit} className={"commentForm"}>
          <input type={"text"} onChange={handleChange} value={content} placeholder={"Make a comment"}
            maxLength={1000}/>

          <button onClick={handleSubmit} className={"interactive hoverShine svgButton"}>
            <span className={"material-icons linkLike interactive"}>send</span>
          </button>
        </form>
      }

      {/*No user alternative prompt*/}
      {
        !user &&
        <>
          <LoginPrompt/>
          &nbsp;to create a comment
        </>
      }
    </div>
  );
};


export default CommentForm;