import { db } from "../connect.js";

export const getSkills = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM userSkills WHERE userId = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error", error: err });
    }
    res.json(results);
  });
};

export const addSkill = (req, res) => {
  const { userId, skill, skillLevel, type } = req.body;
  const query = "INSERT INTO userSkills (userId, skill, skillLevel, type) VALUES (?, ?, ?, ?)";
  db.query(query, [userId, skill, skillLevel, type], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Unable to add skill", error: err });
    }
    res.status(201).json({ message: "Skill added successfully", skillId: results.insertId });
  });
};

export const deleteSkill = (req, res) => {
  const skillId = req.params.skillId;
  const query = "DELETE FROM userSkills WHERE id = ?";
  db.query(query, [skillId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Unable to delete skill", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json({ message: "Skill deleted successfully" });
  });
};
