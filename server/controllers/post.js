import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      userId !== "undefined"
        ? `SELECT DISTINCT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT DISTINCT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

/*sada prelazimo na dodavanje objava*/
export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Niste ulogovani!");
    /*moramo biti ulogovani da bi kačili objave pa je ovaj dio nepromijenjen od gore*/

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        const q = "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUE (?, ?, ?, ?)";
        /*skidamo moment biblioteku da bi nam se vrijeme pokazivalo pravilno, tj. one minute ago, itd*/
        /*pretvaramo to preko funkcije u mysql format datuma*/

        db.query(q, [ req.body.desc, req.body.img, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userInfo.id ], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Objava je kreirana!");
        });
    });
};

export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Niste ulogovani!");
    /*moramo biti ulogovani da bi kačili objave pa je ovaj dio nepromijenjen od gore*/

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?";

        db.query(q, [ req.params.id, userInfo.id ], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json("Objava je obrisana!");
            return res.status(403).json("Možeš brisati samo svoju objavu!");
        });
    });
};