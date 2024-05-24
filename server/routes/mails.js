import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { sendEmail } from "../controllers/mail.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.post("/send-email", sendEmail);

export default router