import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getFriends = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");
    const userId = userInfo.id;  

    const query = `
      SELECT u.id, u.name, u.profilePic, u.email, u.primarySkill
      FROM users u
      INNER JOIN relationships r ON r.followedUserId = u.id OR r.followerUserId = u.id
      WHERE (r.followedUserId = ? OR r.followerUserId = ?) AND u.id != ?
      GROUP BY u.id
    `;

    db.query(query, [userId, userId, userId], (err, friends) => {
      if (err) return res.status(500).json(err);
      res.json(friends);
    });
  });
};
