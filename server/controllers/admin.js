import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import moment from 'moment';

//brojimo koliko ima ukupno korisnika sajta
export const getTotalUsers = (req, res) => {
    const q = `SELECT COUNT(*) AS totalUsers FROM users WHERE email != "skillswap24@gmail.com"`;
    //ne brojimo admina u korisnike

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

//brojimo koliko ima objava
export const getTotalPosts = (req, res) => {
    const q = `SELECT COUNT(*) AS totalPosts FROM posts`;

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

//brojimo u kom gradu ima najviše korisnika
export const getMostUsersTown = (req, res) => {
    const q = `
        SELECT town, COUNT(*) as user_count 
        FROM users 
        GROUP BY town 
        ORDER BY user_count DESC 
        LIMIT 1
    `;

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data[0]);
        return res.status(200).json(data[0]);
    });
};

export const getUsersAdmin = (req, res) => {
    const q = `
        SELECT id, name, email, town, primarySkill, primarySkillLevel, learningPref, profilePic, coverPic 
        FROM users
        WHERE email != 'skillswap24@gmail.com'
    `; //ne treba nam da se prikazuje admin!

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addUserAdmin = (req, res) => {
  const { email, password, name, town, primarySkill, learningPref } = req.body;
  const profilePic = '1716245659166360_F_604795233_5zIpEvhWizTN7bUxSADUdrQQFGj315G3.jpg'; 
  const coverPic = '1716245659157green-abstract-background_1134661-5251.png'; //podrazumijevana profilna i naslovna dok je ne promijenimo
  
  //provjerimo da li već postoji
  const q1 = "SELECT * FROM users WHERE email = ?";
  db.query(q1, [email], (err, userData) => {
    if (err) return res.status(500).json(err);
    if (userData.length > 0) return res.status(409).json("Korisnik sa ovom email adresom već postoji.");

    //enkripcija lozinke
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //unošenje novog korisnika
    const q2 = "INSERT INTO users (`email`, `password`, `name`, `town`, `profilePic`, `coverPic`, `primarySkill`, `primarySkillLevel`, `learningPref`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [email, hashedPassword, name, town, profilePic, coverPic, primarySkill, 'odličan', learningPref];

    db.query(q2, values, (err, result) => {
      if (err) return res.status(500).json(err);

      //vraćemo korisnika!
      const q3 = "SELECT id, name, email, town, primarySkill, primarySkillLevel, learningPref, profilePic, coverPic FROM users WHERE email = ?";
      db.query(q3, [email], (err, newUserData) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(newUserData[0]);
      });
    });
  });
};

export const deleteUserAdmin = (req, res) => { //kao i na user strani, provjeravamo da se izvrši svaki dio brisanja!!!
  const userId = req.params.userId;

  const deleteQueries = [
    { query: "DELETE FROM posts WHERE userId = ?", params: [userId] },
    { query: "DELETE FROM comments WHERE userId = ?", params: [userId] },
    { query: "DELETE FROM userSkills WHERE userId = ?", params: [userId] },
    { query: "DELETE FROM likes WHERE userId = ?", params: [userId] },
    { query: "DELETE FROM relationships WHERE followerUserId = ? OR followedUserId = ?", params: [userId, userId] },
    { query: "DELETE FROM users WHERE id = ?", params: [userId] }
  ];

  const executeQuery = ({ query, params }) => {
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  Promise.all(deleteQueries.map(executeQuery))
    .then(results => {
      const userResult = results[results.length - 1];
      if (userResult.affectedRows > 0) {
        return res.status(200).json("Korisnik je uspješno obrisan.");
      } else {
        return res.status(404).json("Korisnik nije pronađen.");
      }
    })
    .catch(err => res.status(500).json(err.message || "Došlo je do greške."));
};

export const updateUserAdmin = (req, res) => {
  console.log(req.body);
  const { id, email, password, name, town, profilePic, coverPic, primarySkill, primarySkillLevel, learningPref } = req.body;

  let q = "UPDATE users SET `email`=?, `name`=?, `town`=?, `profilePic`=?, `coverPic`=?, `primarySkill`=?, `primarySkillLevel`=?, `learningPref`=? WHERE id=?";
  const values = [email, name, town, profilePic, coverPic, primarySkill, primarySkillLevel, learningPref, id];

  //slična situacija kao apdejt korisnika, da se ne poremeti lozinka koja je već u bazi, mijenjanje je opcionalno
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    q = "UPDATE users SET `email`=?, `password`=?, `name`=?, `town`=?, `profilePic`=?, `coverPic`=?, `primarySkill`=?, `primarySkillLevel`=?, `learningPref`=? WHERE id=?";
    values.splice(1, 0, hashedPassword); //unesemo na drugo mjesto query - ja
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.affectedRows > 0) {
      const q2 = "SELECT * FROM users WHERE id = ?";
      db.query(q2, [id], (err, updatedUserData) => {
        if (err) return res.status(500).json(err);
        const updatedUserInfo = updatedUserData[0]; //vraćemo korisnika
        console.log(updatedUserInfo);
        return res.json(updatedUserInfo);
      });
    } else {
      return res.status(403).json("Greška!");
    }
  });
};

export const getPostsAdmin = (req, res) => {
    const q = `
        SELECT posts.id, posts.desc, posts.img, posts.createdAt, users.name AS userName, users.profilePic AS userProfile
        FROM posts
        JOIN users ON posts.userId = users.id
    `;

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addPostAdmin = (req, res) => {
    const { desc, img, userId } = req.body;

    const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?, ?, ?, ?)";
    const values = [desc, img || null, userId, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];

    db.query(q, values, (err, result) => {
        if (err) return res.status(500).json(err);
        const postId = result.insertId;
        const q2 = "SELECT p.id, p.desc, p.img, p.userId, p.createdAt, u.name as userName, u.profilePic as userProfile FROM posts p LEFT JOIN users u ON p.userId = u.id WHERE p.id = ?";
        db.query(q2, [postId], (err, newPostData) => {
            if (err) return res.status(500).json(err);
            return res.status(201).json(newPostData[0]);
        });
    });
};

export const updatePostAdmin = (req, res) => {
    const { postId } = req.params;
    const { desc, img } = req.body;

    const q = "UPDATE posts SET `desc`=?, `img`=?, `createdAt`=? WHERE id=?";
    const values = [desc, img || null, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), postId];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) {
            const q2 = `
                SELECT p.id, p.desc, p.img, p.createdAt, u.name as userName, u.profilePic as userProfile 
                FROM posts p 
                LEFT JOIN users u ON p.userId = u.id 
                WHERE p.id = ?
            `;
            db.query(q2, [postId], (err, updatedPostData) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(updatedPostData[0]); //vraćemo objekat kao i kod add, jer nam treba da se automatski ažurira na stranici, pa proslijeđujemo objekat
            });
        } else {
            return res.status(404).json("Objava nije pronađena.");
        }
    });
};

export const deletePostAdmin = (req, res) => {
    const { postId } = req.params;
    const q = "DELETE FROM posts WHERE id = ?";
    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("Objava uspješno obrisana.");
        return res.status(404).json("Objava nije pronađena.");
    });
};

export const searchUsersAdmin = (req, res) => {
    const { query } = req.query;
    const q = `
        SELECT id, name, email, town, primarySkill, primarySkillLevel, learningPref, profilePic, coverPic 
        FROM users
        WHERE email != 'skillswap24@gmail.com' AND LOWER(name) LIKE LOWER(?)
    `;

    const values = [`%${query}%`];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const searchPostsAdmin = (req, res) => {
    const { query } = req.query;
    const q = `
        SELECT posts.id, posts.desc, posts.img, posts.createdAt, users.name AS userName, users.profilePic AS userProfile
        FROM posts
        JOIN users ON posts.userId = users.id
        WHERE LOWER(users.name) LIKE LOWER(?)
    `;

    const values = [`%${query}%`];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
