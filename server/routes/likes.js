import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getLikes, addLike, deleteLike } from "../controllers/like.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", deleteLike);

export default router