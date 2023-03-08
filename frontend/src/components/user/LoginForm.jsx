import {useState, useContext} from "react";

import {readUser} from "../../api/UserController";
import UserContext from "../../UserContext.jsx";

const LoginForm = ({closePage}) => {
  const [username, setUsername] = useState("");

  const {loginUser} = useContext(UserContext);

  //Update username state to reflect input
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    setUsername(value);
  };

  //Try logging in user
  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    //Validate input
    if (username.trim().length < 1) {
      valid = false;
      alert("Invalid login");
    }

    //Try logging in user
    if (valid) {
      readUser(username).then((user) => {
        if (user) {
          loginUser(user);
          closePage();
        }
      });
    }
  };

  return (
    <div className={"loginForm page"}>
      {/*Page Header*/}
      <div className={"pageHeader"}>
        <h1>Login</h1>

        <button className={"linkLike interactive svgButton"} onClick={closePage}>
          <span className={"material-icons linkLike"}>close</span>
        </button>
      </div>

      {/*Inputs*/}
      <form onSubmit={handleSubmit}>
        <input type={"text"} placeholder={"username"} maxLength={32} onChange={handleChange}/>
        <input type={"submit"} className={"interactive"}/>
      </form>
    </div>
  );
};


export default LoginForm;