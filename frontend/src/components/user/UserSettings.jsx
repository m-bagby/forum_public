import {useContext} from "react";

import {deleteUser} from "../../api/UserController";
import UserForm from "./UserForm.jsx";
import UserContext from "../../UserContext";
import ModalContext from "../../ModalContext";

const UserSettings = ({user, closeSettings, logoutUser}) => {
  const {loginUser} = useContext(UserContext);
  const {setModal} = useContext(ModalContext);

  //Open the user form in modal
  const editUser = () => {
    setModal(<UserForm user={user} closePage={finishEditing}/>);
  };

  //Update user if needed and close modal
  const finishEditing = (newUser) => {
    if (newUser) {
      loginUser(newUser);
    }
    setModal(null);
  };

  //Tell API controller to delete and then logout when completed
  const handleDelete = () => {
    deleteUser(user._id).then(() => {
      logoutUser();
    });
  };

  const exit = () => {
    closeSettings();
  };

  return (
    <div className={"page"}>
      {/*Page Header*/}
      <div className={"pageHeader"}>
        <h1>User Settings</h1>

        <button className={"linkLike interactive svgButton"} onClick={exit}>
          <span className={"material-icons linkLike"}>close</span>
        </button>
      </div>

      {/*Page Body*/}
      <div className={"message"}>
        <img src={user.image} alt={"profileImage"}/>
        <h2>{user.username}</h2>
      </div>

      <button className={"dark-button interactive"} onClick={editUser}>Edit</button>
      <br/>
      <button className={"dark-button interactive"} onClick={handleDelete}>Delete Account</button>
    </div>
  );
};


export default UserSettings;