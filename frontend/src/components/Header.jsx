import {useContext} from "react";

import User from "./user/User";
import CreatePostPrompt from "./post/CreatePostPrompt";
import UserContext from "../UserContext";
import LoginPrompt from "./user/LoginPrompt";

const Header = () => {
  const {user} = useContext(UserContext);

  return (
    <header>
      <div className={"logoContainer"}>
        <a href={"/"}>
          <img src={"/images/forumIcon.svg"} alt={"Forum Icon"}/>
        </a>
        <a href={"/"}>
          <h2>Forum</h2>
        </a>
      </div>

      <div className={"userContainer"}>
        {
          user &&
          <>
            <CreatePostPrompt/>
            <User/>
          </>
        }

        {
          !user &&
          <LoginPrompt/>
        }
      </div>
    </header>
  );
};

export default Header;