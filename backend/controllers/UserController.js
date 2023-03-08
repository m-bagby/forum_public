import User from "../models/User.js";
import {containsProfanity, isAlphaNumeric} from "../utils/formatter.js";


//Create a user
export const createUser = async (req, res) => {
  const user = new User;

  //Get properties
  const username = req.body.username;

  //Validate username
  //No usernames with profanity
  if (containsProfanity(username)) {
    const message = JSON.stringify({errorMessage: "Username cannot contain profanity"});
    res.send(message).status(400);
    return;
  }
  //Only plain letters or numbers
  else if (!isAlphaNumeric(username)) {
    const message = JSON.stringify({errorMessage: "Username can only consist of letters and numbers"});
    res.send(message).status(400);
    return;
  }

  //Set user object properties
  user.username = username;

  //Save user object
  user.save((error, user) => {
    //Handle errors
    if (error) {
      //Custom error response for username conflicts
      if (error.code === 11000) {
        const message = JSON.stringify({errorMessage: "Username is taken"});
        res.send(message).status(400);
      }
      //Generic error
      else {
        console.log("ERROR CREATING USER");
        console.log(error);
        res.sendStatus(400);
      }
    }
    //Success, return user
    else {
      res.send(user).status(200);
    }
  });
};


//Get a user
export const readUser = async (req, res) => {
  const query = req.query; //Query with userid

  //Get user with id
  User.findOne(query, (error, user) => {
    //Handle errors
    if (error) {
      console.log("ERROR READING USER");
      console.log(error);
      res.sendStatus(400);
    }
    else {
      //Success, return user
      if (user) {
        res.send(user).status(200);
      }
      //Custom error for no user
      else {
        const message = JSON.stringify({errorMessage: "User not found"});
        res.send(message).status(400);
      }
    }
  });
};


//Edit user
export const updateUser = async (req, res) => {
  const id = req.body.id;
  const username = req.body.username;

  //Validate Username
  //Username can't contain profanity
  if (containsProfanity(username)) {
    const message = JSON.stringify({errorMessage: "Username cannot contain profanity"});
    res.send(message).status(400);
    return;
  }
  //Username must be strictly plain letters and numbers
  else if (!isAlphaNumeric(username)) {
    const message = JSON.stringify({errorMessage: "Username can only consist of letters and numbers"});
    res.send(message).status(400);
    return;
  }

  //Get user with id
  User.findById(id, (error, user) => {
    //Handle errors
    if (error) {
      console.log("ERROR UPDATING USER");
      console.log(error);
      res.sendStatus(400);
    }
    //Update user
    else {
      //Set new properties
      user.username = username;

      //Save and return updated user
      user.save((error, user) => {
        //Handle errors
        if (error) {
          console.log("ERROR UPDATING USER");
          console.log(error);
          res.sendStatus(400);
        }
        //Success, return updated user
        else {
          res.send(user).status(200);
        }
      });
    }
  });
};


//Delete user
export const deleteUser = async (req, res) => {
  //get id from req
  const id = req.body.id;

  //delete user with id
  User.findByIdAndDelete(id, (error) => {
    //Handle errors
    if (error) {
      console.log("ERROR DELETING USER");
      console.log(error);
      res.sendStatus(400);
    }
    //Success
    else {
      res.sendStatus(200);
    }
  });
};