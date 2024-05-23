import express from "express";
import { getTotalPosts, getTotalUsers, getMostUsersTown, getUsersAdmin, addUserAdmin, updateUserAdmin, deleteUserAdmin, getPostsAdmin, addPostAdmin, updatePostAdmin, deletePostAdmin } from "../controllers/admin.js";

const router = express.Router();

/*ovdje sada idu zahtjevi*/
router.get("/total-users", getTotalUsers);
router.get("/total-posts", getTotalPosts);
router.get("/most-users-town", getMostUsersTown);
router.get("/users", getUsersAdmin);
router.post("/users", addUserAdmin);
router.put("/users", updateUserAdmin);
router.delete("/users/:userId", deleteUserAdmin);
router.get("/posts", getPostsAdmin);
router.put("/posts/:postId", updatePostAdmin);
router.post("/posts", addPostAdmin);
router.delete("/posts/:postId", deletePostAdmin);

export default router