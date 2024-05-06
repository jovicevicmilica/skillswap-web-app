import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getComments, addComment } from "../controllers/comment.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/", getComments);
router.post("/", addComment);

export default router