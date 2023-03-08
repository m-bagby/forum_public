import mongoose from "mongoose";

import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import {filterProfanity} from "../utils/formatter.js";


//Create new comment
export const createComment = async (req, res) => {
  //Create comment
  const comment = new Comment;
  let content = req.body.content;

  //Format comment content
  content.trim();
  content = filterProfanity(content);

  //Set comment properties
  comment.user = req.body.userId;
  comment.post = req.body.postId;
  comment.content = content;

  //Save comment
  comment.save(async (error, comment) => {
    //Handle errors
    if (error) {
      console.log("ERROR CREATING COMMENT");
      console.log(error);
      res.sendStatus(400);
    }
    //Success, update post parent and return new comment
    else {
      //Increment parent post's comment count
      Post.findByIdAndUpdate(comment.post, {$inc: {commentsCount: 1}})
        .then(async (error) => {
          if (error) {
            console.log(error);
          }

          //Populate comment user info
          await comment.populate("user", "username image");

          //Return comment
          res.send(comment).status(200);
        });
    }
  });
};


//Read a single comment
export const readComment = async (req, res) => {
  //Get id from request
  const commentId = req.params.commentId;

  //Get comment with id
  Comment.findById(commentId)
    .populate("user", "username image") //Fill in user properties
    .exec((error, comment) => {
      //Handle errors
      if (error) {
        console.log("ERROR READING COMMENT");
        console.log(error);
        res.sendStatus(400);
      }
      //Success, return comment
      else {
        res.send(comment).status(200);
      }
    });
};


//Read comments
export const readComments = async (req, res) => {
  const query = {};

  //Set query params
  const skip = parseInt(req.query.skip);
  if (req.query.post) {
    query.post = mongoose.Types.ObjectId(req.query.post);
  }

  //Get comment with id
  Comment.find(query)
    .populate("user", "username image") //fill in user properties
    .sort({"dates.created": -1})
    .limit(10)
    .skip(skip)
    .exec(async (error, comments) => {
      //Handle errors
      if (error) {
        console.log("ERROR READING COMMENTS");
        console.log(error);
        res.sendStatus(400);
      }
      //Success, return comments and query info
      else {
        const response = {comments};
        const commentsCount = await Comment.count(query);

        //Tell if end of query has been reached
        response.isMore = commentsCount > (skip + comments.length);

        res.send(response).status(200);
      }
    });
};


//Update comment
export const updateComment = async (req, res) => {
  //Get comment properties from req
  const id = req.body.id;
  let content = req.body.content;

  //Format content
  content.trim();
  content = filterProfanity(content);

  //Get comment and update it with the new properties
  Comment.findById(id, (error, comment) => {
    //Handle errors
    if (error) {
      console.log("ERROR UPDATING COMMENT");
      console.log(error);
      res.sendStatus(400);
    }
    //Make changes and save comment
    else {
      comment.content = content;

      comment.save(async (error, comment) => {
        //handle errors
        if (error) {
          console.log("ERROR UPDATING COMMENT");
          console.log(error);
          res.sendStatus(400);
        }
        //Success, return comment
        else {
          //Fill in user properties
          await comment.populate("user", "username image");

          res.send(comment);
        }
      });
    }
  });
};


//Delete comment object
export const deleteComment = async (req, res) => {
  //get id from req
  const comment = req.body.comment;
  const postId = comment.post;

  //delete comment with id
  Comment.findByIdAndDelete(comment._id, async (error) => {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      //Decrement parent post's comment count
      await Post.findByIdAndUpdate(postId, {$inc: {commentsCount: -1}})
        .then(async (error) => {
          if (error) {
            console.log(error);
          }

          res.sendStatus(200);
        });


    }
  });
};