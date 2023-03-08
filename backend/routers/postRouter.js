import express from "express";
import {createPost, readPost, readPosts, updatePost, deletePost} from "../controllers/PostController.js";

const router = express.Router();

router.post("", createPost);
router.get("/:postId", readPost);
router.get("", readPosts);
router.put("", updatePost);
router.delete("", deletePost);

export default router;