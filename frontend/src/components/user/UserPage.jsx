import React from "react";

const UserPage = ({user, closePage}) => {
  return (
    <div className={"userPage page"}>
      <div className={"pageHeader"}>
        <h1>{user.username}</h1>

        <button className={"linkLike interactive svgButton"} onClick={closePage}>
          <span className={"material-icons linkLike"}>close</span>
        </button>
      </div>

      <div>
        <img src={user.image} alt={"profile picture"}/>
      </div>
    </div>
  );
};

export default UserPage;