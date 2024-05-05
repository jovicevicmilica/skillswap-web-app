import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getPosts, addPost } from "../controllers/post.js"; 
const router = express.Router();

/*ovdje sada idu zahtjevi*/
router.get("/home-page/posts", getPosts); /*da vidimo objave*/
router.post("/home-page/posts", addPost); /*da objavimo*/

export default router;