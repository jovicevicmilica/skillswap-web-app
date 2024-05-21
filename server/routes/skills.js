import express from "express"; /*ovo radi preko importa sada jer sam dodala u package.json taj module*/
import { getSkills, addSkill, deleteSkill } from "../controllers/skill.js"; 
const router = express.Router()

/*ovdje sada idu zahtjevi*/
router.get("/:userId", getSkills);
router.post("/", addSkill);
router.delete("/:skillId", deleteSkill);

export default router