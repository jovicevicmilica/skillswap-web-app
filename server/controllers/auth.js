import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    /*provjeravamo da li već postoji korisnik sa datim mejlom*/
    const q = "SELECT * FROM users WHERE email = ?"; /*koristimo ? umjesto req.body.email zbog sigurnosti*/
    
    db.query(q, [req.body.email], (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }
        
        if(data.length) return res.status(409).json("Korisnik već postoji!"); /*postoji već jedan s tim mejlom*/

        /*sada hešujemo lozinku korisnika, to znači da je enkriptujemo i tako unosimo u bazu*/
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`name`, `email`, `password`, `primarySkill`) VALUE (?, ?, ?, ?)";

        db.query(q, [req.body.name, req.body.email, hashedPassword, req.body.primarySkill], (err, data) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json("Uspješno napravljen korisnik!");
        });
    });
}

export const login = (req, res) => {
    /*prvo provjeravamo je li korisnik registrovan, a zatim je li ispravna lozinka*/
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if(data.length === 0) return res.status(404).json("Korisnik nije pronađen!"); /*nema nalog*/

        console.log(req.body.password)
        console.log(data[0].password)
        const checkPass = bcrypt.compareSync(req.body.password, data[0].password); /*data[0] znači da uzimamo tog prvog korisnika, i upoređujemo unijetu sa njegovom lozinkom u bazi*/
        console.log(checkPass);
        if(!checkPass) return res.status(400).json("Pogrešna lozinka ili email!");
        const token = jwt.sign({ id:data[0].id }, "secretkey"); /*ovo radimo da bi samo korisnik čija je objava mogao da je briše itd.*/

        const { password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none" /*server nam je na 8800, a front na 3000, pa zato ovo mora*/
    }).status(200).json("Korisnik se izlogovao!");
};