import {useContext} from "react";

import PostForm from "./PostForm";
import ModalContext from "../../ModalContext";


const CreatePostPrompt = () => {
  const {setModal} = useContext(ModalContext);

  //Open post form in modal
  const openPostForm = () => {
    setModal(
      <PostForm closePage={closePostForm}/>
    );
  };

  //Close the post form
  const closePostForm = () => {
    setModal(null);
  };

  return (
    <>
      <button className={"linkLike interactive hoverShine svgButton"} onClick={openPostForm} title={"Create Post"}>
        <span className={"material-icons linkLike interactive"}>add</span>
      </button>
    </>
  );
};

export default CreatePostPrompt;