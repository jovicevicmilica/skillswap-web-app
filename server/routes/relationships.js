import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getRelationships, addRelationship, deleteRelationship } from "../controllers/relationship.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/", getRelationships);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router