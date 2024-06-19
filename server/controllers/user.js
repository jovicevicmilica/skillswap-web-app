import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//da pridobijemo podatke o korisniku na osnovu id - ja
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

//da ažuriramo korisnika
export const updateUser = (req, res) => {
  console.log(req.body);
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if(err) return res.status(403).json("Token nije validan.");

    let q = "UPDATE users SET `email`=?, `name`=?, `town`=?, `profilePic`=?, `coverPic`=?, `primarySkill`=?, `primarySkillLevel`=?, `learningPref`=? WHERE id=?";
    const values = [req.body.email, req.body.name, req.body.town, req.body.profilePic, req.body.coverPic, req.body.primarySkill, req.body.primarySkillLevel, req.body.learningPref, userInfo.id];

    //ako je lozinka poslata, dodamo je nakon što je šifriramo, a inače ostaje stara
    if(req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      q = "UPDATE users SET `email`=?, `password`=?, `name`=?, `town`=?, `profilePic`=?, `coverPic`=?, `primarySkill`=?, `primarySkillLevel`=?, `learningPref`=? WHERE id=?";
      values.splice(1, 0, hashedPassword); //ubacimo šifriranu lozinku na drugo mjesto, novi upit
    };
    
    db.query(q, values, (err, data) => {
        if(err) return res.status(500).json(err);

        if(data.affectedRows > 0) {
          //vraćamo authContext - u korisničke podatke, a ne samo poruku
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

//brišemo korisnika
export const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  try {
    const userInfo = jwt.verify(token, "secretkey");
    const deleteQueries = [ //ovo sve treba da se izvrši
      { query: "DELETE FROM posts WHERE userId = ?", params: [userId] },
      { query: "DELETE FROM comments WHERE userId = ?", params: [userId] },
      { query: "DELETE FROM userSkills WHERE userId = ?", params: [userId] },
      { query: "DELETE FROM likes WHERE userId = ?", params: [userId] },
      { query: "DELETE FROM relationships WHERE followerUserId = ? OR followedUserId = ?", params: [userId, userId] },
      { query: "DELETE FROM users WHERE id = ?", params: [userId] }
    ];

    await db.beginTransaction(); //da bi se izvršilo zajedno, pozivamo kao transakciju

    for (let { query, params } of deleteQueries) {
      await new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
          if (err) return reject(err);
          resolve(result); //koristimo promise da bi osigurali da se obrisalo sve zajedno
        });
      });
    }

    await db.commit();
    res.status(200).json("Korisnik je uspješno obrisan.");
  } catch (err) {
    await db.rollback();
    res.status(500).json(err.message || "Došlo je do greške.");
  }
};


