import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getUser, updatePopup } from "../controllers/user.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/find/:userId", getUser);
router.get("/", updatePopup)

export default router