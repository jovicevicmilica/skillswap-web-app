import { db } from "../connect.js";

//da pridobijemo vještine koje nisu primarna, ovo nam treba za UPDATE dio
export const getSkills = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM userSkills WHERE userId = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Greška u serveru", error: err });
    }
    res.json(results);
  });
};

//da dodamo vještine u update dijelu
export const addSkill = (req, res) => {
  const { userId, skill, skillLevel, type } = req.body;
  const query = "INSERT INTO userSkills (userId, skill, skillLevel, type) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, skill, skillLevel, type], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Neuspješno dodavanje vještine", error: err });
    }
    res.status(201).json({ message: "Vještina uspješno dodata", skillId: results.insertId });
  });
};

//obrisati vještinu iz update - a
export const deleteSkill = (req, res) => {
  const skillId = req.params.skillId;
  const query = "DELETE FROM userSkills WHERE id = ?";
  db.query(query, [skillId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Neuspješno obrisana vještina", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Vještina nije pronađena" });
    }
    res.json({ message: "Vještina uspješno obrisana" });
  });
};
