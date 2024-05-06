import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getPosts, addPost } from "../controllers/post.js"; 
const router = express.Router();

/*ovdje sada idu zahtjevi*/
router.get("/", getPosts); /*da vidimo objave*/
router.post("/", addPost); /*da objavimo*/
export default router;