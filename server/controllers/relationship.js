import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const userId = req.query.followedUserId;
  const token = req.cookies.accessToken;

  //dodajemo token i verifikaciju da bi dobili userInfo i provjerili praćenje
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");

    const q = `
      SELECT r1.followerUserId, r2.followerUserId AS mutual
      FROM relationships AS r1
      LEFT JOIN relationships AS r2 ON r1.followerUserId = r2.followedUserId AND r1.followedUserId = r2.followerUserId
      WHERE r1.followedUserId = ?;
    `;

    db.query(q, [userId], (err, results) => {
      if (err) return res.status(500).json(err);

      const isFollowing = results.some(item => item.followerUserId === userInfo.id);
      const followers = results.map(item => ({
        followerUserId: item.followerUserId,
        isMutual: item.mutual != null
      }));

      res.status(200).json({ followers, isFollowing });
    });
  });
};

export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Niste ulogovani!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUE (?, ?)";

        db.query(q, [ userInfo.id, req.body.userId ], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Zapraćeni!");
        });
    });
};

export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Niste ulogovani!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

        db.query(q, [ userInfo.id, req.query.userId ], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Otpraćeni!");
        });
    });
};