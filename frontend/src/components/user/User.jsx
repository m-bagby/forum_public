import {useState, useContext, useEffect, useRef} from "react";

import UserSettings from "./UserSettings.jsx";
import UserContext from "../../UserContext.jsx";
import ModalContext from "../../ModalContext";


const User = () => {
  const {user, loginUser} = useContext(UserContext);
  const {setModal} = useContext(ModalContext);

  const [showMenu, setShowMenu] = useState(false);
  const userMenuRef = useRef(null); //Reference to component's top element

  //Close the options dropdown if clicked off of
  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };
  //Manage handlers
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  //Open the user settings page in modal
  const openSettings = () => {
    setModal(<UserSettings user={user} closeSettings={closeSettings} logoutUser={logoutUser}/>);
  };

  const closeSettings = () => {
    setModal(null);
  };

  const logoutUser = () => {
    loginUser(null);
  };

  //Open and close the user menu options
  const toggleShowMenu = () => {
    setShowMenu(prevState => !prevState);
  };


  return (
    <div className={"headerUserContainer"} ref={userMenuRef}>
      {/*Current user and dropdown button*/}
      <button className={"userMenuButton linkLike interactive hoverShine svgButton"} onClick={toggleShowMenu}>
        <img className={"profilePicture"} src={user.image} alt={"profile picture"}/>
        <h3>{user.username}</h3>
        <span className={"material-icons"}>expand_more</span>
      </button>

      {/*User Menu*/}
      {
        showMenu &&
        <div className={"userMenu"}>
          <button className={"linkLike interactive svgButton"} onClick={openSettings}>Settings</button>
          <button className={"linkLike interactive svgButton"} onClick={logoutUser}>Logout</button>
        </div>
      }
    </div>
  );
};

export default User;