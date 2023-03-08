import Post from "../models/Post.js";
import {filterProfanity} from "../utils/formatter.js";


//Create new post
export const createPost = async (req, res) => {
  //Create post
  const post = new Post;

  //Get properties from request
  let title = req.body.title;
  let content = req.body.content;

  //Format the properties' content
  title.trim();
  title = filterProfanity(title);

  content.trim();
  content = filterProfanity(content);

  //Set post properties
  post.user = req.body.userId;
  post.title = title;
  post.content = content;

  //Save post
  post.save(async (error, post) => {
    //Handle Errors
    if (error) {
      console.log("ERROR CREATING POST");
      console.log(error);
      res.sendStatus(400);
    }
    //Success, return post
    else {
      //Fill in the user properties
      await post.populate("user", "username image");
      res.send(post).status(200);
    }
  });
};


//Read a single post
export const readPost = async (req, res) => {
  //Get id from request
  const postId = req.params.postId;

  //Get post
  Post.findById(postId)
    .populate("user", "username image") //fill in user properties
    .exec((error, post) => {
      //Handle errors
      if (error) {
        console.log("ERROR READING POST");
        console.log(error);
        res.sendStatus(400);
      }
      //Success, return post
      else {
        res.send(post).status(200);
      }
    });
};


//Read multiple posts
export const readPosts = async (req, res) => {
  //Get query parameters
  const skip = parseInt(req.query.skip);

  Post.find({})
    .populate("user", "username image") //fill in user properties
    .sort({"dates.created": -1}) //static sort newest first for now
    .skip(skip)
    .limit(10)
    .exec(async (error, posts) => {
      //Handle errors
      if (error) {
        console.log("ERROR READING POSTS");
        console.log(error);
        res.sendStatus(400);
      }
      //Success, return posts
      else {
        const response = {posts};
        const postsCount = await Post.count();

        //Tell if end of query has been reached
        response.isMore = postsCount > (skip + posts.length);

        res.send(response).status(200);
      }
    });
};


//Update post
export const updatePost = async (req, res) => {
  //Get post properties from req
  const id = req.body.id;
  let title = req.body.title;
  let content = req.body.content;

  //Format the content
  title.trim();
  title = filterProfanity(title);

  content.trim();
  content = filterProfanity(content);

  //Get post from id
  Post.findById(id, (error, post) => {
    //Handle errors
    if (error) {
      console.log("ERROR UPDATING POST");
      console.log(error);
      res.sendStatus(400);
    }
    //Set new properties and save
    else {
      post.title = filterProfanity(title);
      post.content = filterProfanity(content);

      post.save(async (error, post) => {
        //Handle errors
        if (error) {
          console.log("ERROR UPDATING POST");
          console.log(error);
          res.sendStatus(400);
        }
        //Success, return updated post
        else {
          //Fill in user properties
          await post.populate("user", "username image");

          res.send(post).status(200);
        }
      });
    }
  });
};


//Delete post object
export const deletePost = async (req, res) => {
  //Get id from req
  const id = req.body.id;

  //Delete post with id
  Post.findByIdAndDelete(id, (error) => {
    //Handle errors
    if (error) {
      console.log("ERROR DELETING POST");
      console.log(error);
      res.sendStatus(400);
    }
    //Success
    else {
      res.sendStatus(200);
    }
  });
};