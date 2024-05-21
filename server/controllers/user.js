import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q1 = "SELECT * FROM users WHERE id = ?";
  const q2 = "SELECT skill, skillLevel, type FROM userSkills WHERE userId = ?";

  db.query(q1, [userId], (err, userData) => {
    if (err) return res.status(500).json(err);
    if (userData.length === 0) return res.status(404).json("Korisnik nije pronađen.");

    const userInfo = userData[0];

    db.query(q2, [userId], (err, skillsData) => {
      if (err) return res.status(500).json(err);
      return res.json({ ...userInfo, skills: skillsData });
    });
  });
};

export const updateUser = (req, res) => {
  console.log(req.body);
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if(err) return res.status(403).json("Token nije validan.");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q = "UPDATE users SET `email`=?, `password`=?, `name`=?, `town`=?, `profilePic`=?, `coverPic`=?, `primarySkill`=?, `primarySkillLevel`=?, `learningPref`=? WHERE id=?";

    db.query(q, [req.body.email, hashedPassword, req.body.name, req.body.town, req.body.profilePic, req.body.coverPic, req.body.primarySkill, req.body.primarySkillLevel, req.body.learningPref, userInfo.id], (err, data) => {
        if(err) return res.status(500).json(err);

        if(data.affectedRows > 0) {
          //vraćamo authContext - u korisničke podatke
          //da bi se ažurirali podaci na share i leftpart i navbar svaki put kada ažuriramo profil
          const q2 = "SELECT * FROM users WHERE id = ?";
          db.query(q2, [userInfo.id], (err, updatedUserData) => {
            if (err) return res.status(500).json(err);
            const updatedUserInfo = updatedUserData[0];
            console.log(updatedUserInfo)
            return res.json(updatedUserInfo);
          });
        } else {
          return res.status(403).json("Greška!");
        }
    });
  });
};

