import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    //za svakog korisnika izlistavamo njegove pratitelje
    db.query(q, [ req.query.followedUserId ], (err, data) => { 
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship=>relationship.followerUserId)); //vraćamo ih
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