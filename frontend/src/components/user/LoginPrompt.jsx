import {useContext} from "react";

import UserForm from "./UserForm.jsx";
import LoginForm from "./LoginForm.jsx";
import ModalContext from "../../ModalContext.jsx";

const LoginPrompt = () => {
  const {setModal} = useContext(ModalContext);

  //Open the login form in modal
  const showLogin = () => {
    setModal(<LoginForm closePage={() => {
      setModal(null);
    }}/>);
  };

  //Open the user form in modal
  const showSignUp = () => {
    setModal(<UserForm closePage={() => {
      setModal(null);
    }}/>);
  };

  return (
    <div>
        <span>
        <b role={"button"} onClick={showLogin} className={"interactive linkLike"}>Login</b>
        <span> or </span>
        <b role={"button"} onClick={showSignUp} className={"interactive linkLike"}>Sign Up</b>
      </span>
    </div>
  );
};

export default LoginPrompt;