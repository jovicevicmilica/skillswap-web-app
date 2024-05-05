import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    /*ako nema tokena, vraćemo error, jer ako nismo ulogovani, ne smijemo da vidimo objave*/
    if(!token) return res.status(401).json("Niste ulogovani!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        /*ukoliko token jeste validan, onda dobijamo userInfo umjesto err, i pristupamo id - ju*/

        /*ovo ubacimo sve unutra verify - ja, da bi mogli da koristimo user id*/
        const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
        ORDER BY p.createdAt DESC`; /*uzimamo sve objave, sortiramo naše i naših pratitelja tako da najranije budu na vrhu, zato je DESC*/
        /*sada ćemo promijeniti query tako da se prikazuju samo naše objave i objave naših prijatelja*/
        /*prvo u bazi podesimo relationships*/
        /*user id dobijamo preko cookies u jwt*/

        /*pored objava treba nam takođe i nekoliko detalja korisnika koji je objavio post, kao slika i deskripcija*/
        db.query(q, [userInfo.id, userInfo.id], (err, data) => { /*trebaju nam dva ova id - ja, naš i onih koje vidimo*/
            if(err) return res.status(500).json(err);

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