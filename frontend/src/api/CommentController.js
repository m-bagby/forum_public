import handleBadResponse from "../utils/ErrorHandler.js";


//Create Comment
export const createComment = async (postId, content, userId) => {
  return new Promise(resolve => {
    const req = {
      userId,
      postId,
      content
    };

    fetch(API_URL + "comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(req)
    }).then(res => {
      //Success
      if (res.status === 200) {
        res.json().then(comment => {
          resolve(comment);
        });
      }
      else {
        //Handle error
        handleBadResponse(res);
      }
    });
  });
};


//Get Comments
export const getComments = async (postId, skip) => {
  return new Promise(resolve => {
    const query = "?post=" + postId + "&skip=" + skip;

    fetch(API_URL + "comments" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      cache: "no-store",
    }).then(res => {
      //Success
      if (res.status === 200) {
        res.json().then(response => {
          resolve(response);
        });
      }
      else {
        //Handle error
        handleBadResponse(res);
      }
    });
  });
};


//Update Comment
export const updateComment = async (commentId, content) => {
  return new Promise(resolve => {
    const req = {
      id: commentId,
      content
    };

    fetch(API_URL + "comment", {
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
        res.json().then(comment => {
          resolve(comment);
        });
      }
      else {
        //Handle error
        handleBadResponse(res);
      }
    });
  });
};


//Delete Comment
export const deleteComment = async (comment) => {
  return new Promise(resolve => {
    const req = {
      comment: comment
    };

    fetch(API_URL + "comment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(req)
    }).then(res => {
      //Success
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