import express from "express";
import { getFriends, getExchangeUsers } from "../controllers/friend.js";

const router = express.Router();

router.get("/showFriends", getFriends); //da dobijemo prijatelje
router.get("/showExchangeUsers", getExchangeUsers); //da dobijemo one koji imaju nama potrebne vještine

export default router;
