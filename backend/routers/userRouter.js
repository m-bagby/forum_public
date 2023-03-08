import express from "express";
import {createUser, readUser, updateUser, deleteUser} from "../controllers/UserController.js";

const router = express.Router();

router.post("", createUser);
router.get("", readUser);
router.put("", updateUser);
router.delete("", deleteUser);

export default router;