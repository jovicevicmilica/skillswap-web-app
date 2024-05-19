import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getUser, updateUser } from "../controllers/user.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/find/:userId", getUser);
router.put("/", updateUser);

export default router