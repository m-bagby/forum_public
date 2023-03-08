import {useState, useContext} from "react";

import {createUser, updateUser} from "../../api/UserController.js";
import userContext from "../../UserContext";
import {isAlphaNumeric} from "../../utils/Formatter";

const UserForm = ({closePage}) => {
  const {user, loginUser} = useContext(userContext);

  const editing = user ? true : false; //Whether the form is being used to edit an existing user or create a new one

  const [usernameInput, setUsernameInput] = useState(editing ? user.username : "");


  //Update state to reflect input
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    setUsernameInput(value);
  };


  //Try submitting the input for user edit or creation
  const handleSubmit = (event) => {
    event.preventDefault();

    //Ensure valid username
    let valid = true;
    let username = usernameInput.trim();

    if (username.length < 1) {
      valid = false;
      alert("Username cannot be empty");
    }
    else if (!isAlphaNumeric(username)) {
      valid = false;
      alert("Username can only contain letters and numbers");
    }

    //Call create or edit
    if (valid) {
      if (editing) {
        updateUser(user._id, username).then((user) => {
          loginUser(user);
          closePage();
        });
      }
      else {
        createUser(username).then((user) => {
          loginUser(user);
          closePage();
        });
      }
    }
  };

  //Forget changes and tell parent to close out
  const handleCancel = () => {
    closePage();
  };

  return (
    <div className={"userForm page"}>
      {/*Header*/}
      <div className={"pageHeader"}>
        <h1>{editing ? "Edit" : "Create"} User:</h1>

        <button className={"linkLike interactive svgButton"} onClick={handleCancel}>
          <span className={"material-icons linkLike"}>close</span>
        </button>
      </div>

      {/*Inputs*/}
      <form onSubmit={handleSubmit}>
        <input type={"text"} onChange={handleChange} value={usernameInput} placeholder={"username"}
          maxLength={32}/>
        <input type={"submit"} className={"interactive"}/>
      </form>
    </div>
  );
};


export default UserForm;