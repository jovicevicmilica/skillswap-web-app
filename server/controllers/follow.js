import { db } from "../connect.js";
import jwt from "jsonwebtoken";

//da dobijemo ljude koji nas prate ali ih ne pratimo nazad, ovo ide u rightPart dio, kao zahtjevi za praćenje
export const getFollowers = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");

    const q = `
      SELECT u.id, u.name, u.profilePic
      FROM relationships AS r
      JOIN users AS u ON r.followerUserId = u.id
      WHERE r.followedUserId = ? 
      AND NOT EXISTS (
        SELECT 1
        FROM relationships AS r2
        WHERE r2.followerUserId = ? 
        AND r2.followedUserId = u.id
      );
    `;

    db.query(q, [userInfo.id, userInfo.id], (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(results);
    });
  });
};

//prihvatimo praćenje SAMO SA NAŠE STRANE se unosi
export const acceptFollower = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");

    const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?, ?)";

    db.query(q, [userInfo.id, req.body.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Razmjena prihvaćena!");
    });
  });
};

//odbijamo korisnika, jer se može desiti da ga pratimo, pa hoćemo da ga otpratimo
export const rejectFollower = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");

    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    db.query(q, [req.body.userId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Razmjena odbijena!");
    });
  });
};
