import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ?
    ORDER BY c.createdAt DESC`; //DESC da bi išli najnoviji na vrh

    db.query(q, [req.query.postId], (err, data) => { /*ide req.query.postId zato što nam komentar zavisi od postId - ja*/
        if(err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const addComment = (req, res) => {
    const token = req.cookies.accessToken; //uzmemo token, i provjeravamo da li postoji, jer ako postoji, korisnik je ulogovan
    if(!token) return res.status(401).json("Niste ulogovani!");
    /*moramo biti ulogovani da bi kačili komentare pa je ovaj dio nepromijenjen od gore*/

    jwt.verify(token, "secretkey", (err, userInfo) => { //provjeravamo da li je token validan
        if(err) return res.status(403).json("Token nije validan.");

        const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUE (?, ?, ?, ?)";
        //ovdje unosimo userId, nije neophodno ubacivati slike i sl, to ide u GET

        db.query(q, [ req.body.desc, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userInfo.id, req.body.postId ], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Komentar je kreiran!");
        });
    });
};

export const getCommentCount = (req, res) => {
    const q = `SELECT COUNT(*) as count FROM comments WHERE postId = ?`;
    //da nam vrati broj komentara objave

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0].count); 
    });
};
