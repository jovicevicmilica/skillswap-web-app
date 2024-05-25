import express from "express";
import { getFriends, getExchangeUsers } from "../controllers/friend.js";

const router = express.Router();

router.get("/showFriends", getFriends);
router.get("/showExchangeUsers", getExchangeUsers);

export default router;
