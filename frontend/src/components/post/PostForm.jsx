import {useState, useContext} from "react";

import {updatePost, createPost} from "../../api/PostController";
import UserContext from "../../UserContext.jsx";


const PostForm = ({post, closePage}) => {
  const {user} = useContext(UserContext);

  const editing = post ? true : false; //Whether the form is editing an existing post or making a new one

  const [title, setTitle] = useState(editing ? post.title : "");
  const [content, setContent] = useState(editing ? post.content : "");

  //Update state to reflect input
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === "title") {
      setTitle(value);
    }
    else if (name === "content") {
      setContent(value);
    }
  };


  //Try creating or updating post
  const handleSubmit = (event) => {
    event.preventDefault();

    //Validate input
    let valid = true;
    if (title.trim().length < 1) {
      valid = false;
      alert("Title cannot be empty");
    }
    if (content.trim().length < 1) {
      valid = false;
      alert("Content cannot be empty");
    }

    //Create or update and then redirect to the post's page
    if (valid) {
      if (editing) {
        updatePost(post._id, title.trim(), content.trim()).then((post) => {
          window.location.assign("/post/" + post._id);
        });
      }
      else {
        createPost(user._id, title.trim(), content.trim()).then((post) => {
          window.location.assign("/post/" + post._id);
        });
      }
    }
  };

  const handleClose = () => {
    closePage();
  };


  return (
    <div className={"postForm page postPage"}>
      {/*Header*/}
      <div className={"pageHeader"}>
        <h1>{editing ? "Edit" : "Create"} Post:</h1>

        <button className={"linkLike interactive svgButton"} onClick={handleClose}>
          <span className={"material-icons linkLike"}>close</span>
        </button>
      </div>

      {/*Form*/}
      <form onSubmit={handleSubmit}>
        <input name={"title"} type={"text"} onChange={handleChange} value={title} placeholder={"title"}/>
        <textarea name={"content"} rows={10} onChange={handleChange} value={content} placeholder={"content"}/>
        <input type={"submit"} className={"interactive"}/>
      </form>
    </div>
  );
};


export default PostForm;