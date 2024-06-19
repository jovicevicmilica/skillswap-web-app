import { db } from "../connect.js";
import jwt from "jsonwebtoken";

//da pridobijemo lajk
export const getLikes = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";

    db.query(q, [ req.query.postId ], (err, data) => { /*gledamo lajkove za neku objavu*/
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.userId)); /*za svaki lajk vraćamo id korisnika koji je lajkovao, ovo nam treba da bi omogućili lajk, da ne bi niz čuvao objekte nego brojeve, tj. id*/
    });
};

//da lajkujemo nešto
export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Niste ulogovani!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        const q = "INSERT INTO likes (`userId`, `postId`) VALUE (?, ?)";

        db.query(q, [ userInfo.id, req.body.postId ], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Objava je lajkovana!");
        });
    });
};

//da obrišemo lajk
export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Niste ulogovani!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token nije validan.");

        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

        db.query(q, [ userInfo.id, req.query.postId ], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json("Objava je dislajkovana!");
        });
    });
};