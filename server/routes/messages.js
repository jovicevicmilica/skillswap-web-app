import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getMessages } from "../controllers/message.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/showMessages", getMessages);

export default router