import express from "express";
import {
  createComment,
  deleteComment,
  readComment,
  readComments,
  updateComment
} from "../controllers/CommentController.js";

const router = express.Router();

router.post("", createComment);
router.get("/:commentId", readComment);
router.get("", readComments);
router.put("", updateComment);
router.delete("", deleteComment);

export default router;