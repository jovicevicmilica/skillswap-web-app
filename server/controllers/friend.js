import { db } from "../connect.js";
import jwt from "jsonwebtoken";

//da pridobijemo one koje pratimo i oni nas, tj. 'POVEZANI' smo
export const getFriends = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");
    const userId = userInfo.id;  

    const query = `
      SELECT u.id, u.name, u.profilePic, u.email, u.primarySkill
      FROM users u
      INNER JOIN relationships r1 ON r1.followedUserId = u.id AND r1.followerUserId = ?
      INNER JOIN relationships r2 ON r2.followerUserId = u.id AND r2.followedUserId = ?
      WHERE u.id != ?
    `;
    //popravljena funkcija za getFriends, treba da bude OBOSTRANO!!!
    //ne vraćemo sebe, pa ide u.id != ?

    db.query(query, [userId, userId, userId], (err, friends) => {
      if (err) return res.status(500).json(err);
      res.json(friends);
    });
  });
};

//da pridobijemo korisnike koji imaju vještine koje mi želimo, tj. naše tipa ŽELIM i njihove PRIMARNE ili IMAJU
export const getExchangeUsers = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Niste ulogovani!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token nije validan.");

    const userId = userInfo.id;

    //ISKLJUČUJEMO PRIJATELJE I ADMINA, OVO SU 'PREDLOŽENI'!
    //dakle važe se svi oni KOJE JA NE PRATIM NAZAD!!! ako ih pratim, ne treba da mi predlaže
    //prvi upit za vještine korisnika iz userSkills, vraća korisnike i njihove vještine iz userSkills
    //koje se podudaraju sa našim vještinama tipa 'želim'
    const query1 = `
      SELECT u.id, u.name, u.profilePic, u.town, us.skill
      FROM users u
      JOIN userSkills us ON u.id = us.userId
      WHERE us.type = 'imam' AND us.skill IN (
        SELECT skill FROM userSkills WHERE userId = ? AND type = 'želim'
      )
      AND u.id NOT IN (
        SELECT r.followedUserId FROM relationships r WHERE r.followerUserId = ?
      )
      AND u.email != 'skillswap24@gmail.com'
    `;

    //drugi upit za primarnu vještinu korisnika koja se poklapa sa onom koju 'želim'
    const query2 = `
      SELECT u.id, u.name, u.profilePic, u.town, u.primarySkill as skill
      FROM users u
      WHERE u.primarySkill IN (
        SELECT skill FROM userSkills WHERE userId = ? AND type = 'želim'
      )
      AND u.id NOT IN (
        SELECT r.followedUserId FROM relationships r WHERE r.followerUserId = ?
      )
      AND u.email != 'skillswap24@gmail.com'
    `;

    db.query(query1, [userId, userId, userId], (err, results1) => {
      if (err) return res.status(500).json(err);

      db.query(query2, [userId, userId, userId], (err, results2) => {
        if (err) return res.status(500).json(err);

        //kombinovanje rezultata iz oba upita
        const combinedResults = [...results1, ...results2]; //ide ... da bi raspakovali elemente iz nizova i spojili ih

        //grupisanje rezultata po korisnicima i filtriranje null vrijednosti
        const users = {};
        combinedResults.forEach(row => { //prolazimo kroz skup korisnika
          if (row.skill) { //filtriramo null vrijednosti
            if (!users[row.id]) { //ako već nije u nizu
              users[row.id] = { ...row, skills: [] }; //pravimo element sa praznim vještinama
            }
            users[row.id].skills.push(row.skill); //dodamo vještinu
          }
        });

        res.json(Object.values(users)); //pretvaramo users u niz i uklanjaju se ključevi korisnika, ostaju samo vrijednosti
      });
    });
  });
};
