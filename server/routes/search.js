import express from "express";
import { searchUsers } from "../controllers/search.js";
const router = express.Router();

router.get("/users", searchUsers); //iako je users radi i za vještine

export default router;
