import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getFriends } from "../controllers/friend.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/showFriends", getFriends);

export default router