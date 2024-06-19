import { db } from "../connect.js";
import jwt from "jsonwebtoken";

//da pridobijemo poruke nakon što se obostrano zapratimo s nekim
export const getMessages = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Niste ulogovani!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token nije validan.");

        const userId = userInfo.id; //koristimo ID iz tokena umjesto iz req.user

        const query = `
            SELECT u.id AS userId, u.name, u.email
            FROM users AS u
            WHERE EXISTS (
                SELECT 1 FROM relationships AS r1
                WHERE r1.followerUserId = ? AND r1.followedUserId = u.id
            ) AND EXISTS (
                SELECT 1 FROM relationships AS r2
                WHERE r2.followerUserId = u.id AND r2.followedUserId = ?
            )
        `;

        db.query(query, [userId, userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Greška pri dobijanju poruka", error: err });
            }
            const messages = results.map(row => { //za svakog korisnika s kojim se međusobno pratimo šaljemo ovu poruku preko json - a, i pojavi se u dropdown
                return {
                    name: row.name,
                    email: row.email, //vraćemo ime i email radi nekih stvari na front - u, hoću da omogućim generisanje mejla i neka css uljepšavanja
                    message: `Uspješno ste se povezali sa korisnikom ${row.name}. Ukoliko želite sklopiti dogovor oko razmjene vještina, možete ga kontaktirati na mejlu ${row.email}.`
                };
            });
            res.json(messages); //vratimo poruku u toj formi, da se pojavi u dropdown
        });
    });
};
