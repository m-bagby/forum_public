import handleBadResponse from "../utils/ErrorHandler.js";


//Create User
export const createUser = async (username) => {
  return new Promise(resolve => {
    const req = {
      username
    };

    fetch(API_URL + "user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(req)
    }).then(res => {
      //Successful Creation
      if (res.status === 200) {
        res.json().then(user => {
          resolve(user);
        });
      }
      else {
        //Handle error
        handleBadResponse(res);
      }
    });
  });
};


//Read User
export const readUser = async (username) => {
  return new Promise(resolve => {
    fetch(API_URL + "user/?username=" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      cache: "no-store",
    }).then(res => {
      //Success
      if (res.status === 200) {
        res.json().then(post => {
          resolve(post);
        });
      }
      else {
        //Handle error
        handleBadResponse(res);
      }
    });
  });
};


//Update User
export const updateUser = async (userId, username) => {
  return new Promise(resolve => {
    const req = {
      id: userId,
      username
    };

    fetch(API_URL + "user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(req)
    }).then(res => {
      //Success
      if (res.status === 200) {
        res.json().then(user => {
          resolve(user);
        });
      }
      else {
        //Handle error
        handleBadResponse(res);
      }
    });
  });
};


//Delete User
export const deleteUser = async (userId) => {
  return new Promise(resolve => {
    const req = {
      id: userId
    };

    fetch(API_URL + "user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(req)
    }).then(res => {
      if (res.status === 200) {
        resolve();
      }
      else {
        //Handle error
        handleBadResponse(res);
      }
    });
  });
};