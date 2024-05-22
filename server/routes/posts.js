import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getPosts, addPost, deletePost } from "../controllers/post.js"; 
const router = express.Router();

/*ovdje sada idu zahtjevi*/
router.get("/", getPosts); /*da vidimo objave*/
router.post("/", addPost); /*da objavimo*/
router.delete("/:id", deletePost); /*brišemo objavu, treba nam id da preciziramo koji se briše*/

export default router;