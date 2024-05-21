import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ?
    ORDER BY c.createdAt DESC`; 

    db.query(q, [req.query.postId], (err, data) => { /*ide req.query.postId zato što nam komentar zavisi od postId - ja*/
        if(err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Niste ulogovani!");
    /*moramo biti ulogovani da bi kačili komentare pa je ovaj dio nepromijenjen od gore*/

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUE (?, ?, ?, ?)";

        db.query(q, [ req.body.desc, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userInfo.id, req.body.postId ], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Komentar je kreiran!");
        });
    });
};

export const getCommentCount = (req, res) => {
    const q = `SELECT COUNT(*) as count FROM comments WHERE postId = ?`;

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0].count); //pretpostavlja se da je data array objekata
    });
};
