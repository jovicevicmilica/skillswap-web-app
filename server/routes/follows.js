import express from "express";
import { getFollowers, acceptFollower, rejectFollower } from "../controllers/follow.js";

const router = express.Router();

router.get("/followers", getFollowers);
router.post("/followers/accept", acceptFollower);
router.delete("/followers/reject", rejectFollower);

export default router;
