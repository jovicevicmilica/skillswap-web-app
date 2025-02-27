import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getComments, addComment, getCommentCount } from "../controllers/comment.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/", getComments);
router.post("/", addComment);
router.get("/count", getCommentCount);

export default router