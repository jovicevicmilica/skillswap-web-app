import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q1 = "SELECT * FROM users WHERE id = ?";
  const q2 = "SELECT skill, skillLevel, type FROM userSkills WHERE userId = ?";

  db.query(q1, [userId], (err, userData) => {
    if (err) return res.status(500).json(err);
    if (userData.length === 0) return res.status(404).json("Korisnik nije pronađen.");

    const { password, ...userInfo } = userData[0];

    db.query(q2, [userId], (err, skillsData) => {
      if (err) return res.status(500).json(err);
      return res.json({ ...userInfo, skills: skillsData });
    });
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");

    const q = "UPDATE users SET `name`=?, `town`=?, `profilePic`=?, `coverPic`=?, `primarySkill`=?, `primarySkillLevel`=?, `learningPref`=? WHERE id=?";

    db.query(q, [req.body.name, req.body.town, req.body.profilePic, req.body.coverPic, req.body.primarySkill, req.body.primarySkillLevel, req.body.learningPref, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows > 0) {
        const deleteSkillsQuery = "DELETE FROM userSkills WHERE userId=?";
        db.query(deleteSkillsQuery, [userInfo.id], (err) => {
          if (err) return res.status(500).json(err);

          const insertSkillsQuery = "INSERT INTO userSkills (userId, skill, level, type) VALUES ?";
          const userSkills = req.body.userSkills.map(skill => [userInfo.id, skill.skill, skill.level, 'user']);
          const interestedSkills = req.body.interestedSkills.map(skill => [userInfo.id, skill.skill, skill.level, 'interested']);

          db.query(insertSkillsQuery, [userSkills.concat(interestedSkills)], (err) => {
            if (err) return res.status(500).json(err);
            return res.json("Profil ažuriran!");
          });
        });
      } else {
        return res.status(403).json("Greška!");
      }
    });
  });
};
