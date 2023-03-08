import handleBadResponse from "../utils/ErrorHandler.js";


//Create Post
export const createPost = async (userId, title, content) => {
  return new Promise(resolve => {
    const req = {
      userId,
      title,
      content
    };

    fetch(API_URL + "post", {
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


//Get single post from API
export const getPost = async (postId) => {
  return new Promise(resolve => {
    fetch(API_URL + "post/" + postId, {
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

//Get posts from API
export const getPosts = async (postsLoaded) => {
  return new Promise(resolve => {
    fetch(API_URL + "posts?skip=" + postsLoaded, {
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


//Update Post
export const updatePost = async (postId, title, content) => {
  return new Promise(resolve => {
    const req = {
      id: postId,
      title,
      content
    };

    fetch(API_URL + "post", {
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


//Delete Post
export const deletePost = async (postId) => {
  return new Promise(resolve => {
    const req = {
      id: postId
    };

    fetch(API_URL + "post", {
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
    });
  });
};