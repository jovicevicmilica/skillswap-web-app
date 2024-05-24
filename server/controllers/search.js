import { db } from "../connect.js";

export const searchUsers = (req, res) => {
    //modifikujemo da podržava i detaljnu i običnu pretragu
    const { query, town, hasSkill, hasSkillLevel, wantsSkill, wantsSkillLevel } = req.query;
    //prvi argument nam je obična pretraga, tj. njen query, a ostali preko detaljne
    let sql = `
        SELECT DISTINCT users.id, users.name, users.email, users.primarySkill, users.profilePic, users.town
        FROM users
        LEFT JOIN userSkills ON users.id = userSkills.userId
        WHERE users.email != 'skillswap24@gmail.com'
    `;
    //isključujemo admina iz pretrage, on nije korisnik
    const values = [];
     //koristimo lower da bi podržavalo i kada kucamo malim slovima
    if (query) { //ako je išta pretraženo
        sql += " AND (LOWER(users.name) LIKE LOWER(?) OR LOWER(users.primarySkill) LIKE LOWER(?))";
        values.push(`%${query}%`, `%${query}%`);
    }

    //ako je izabran, biramo i po njemu
    if (town) {
        sql += " AND LOWER(users.town) LIKE LOWER(?)";
        values.push(`%${town}%`);
    }

    if (hasSkill) {
        sql += `
            AND (
                (userSkills.type = 'imam' AND LOWER(userSkills.skill) LIKE LOWER(?))
                OR LOWER(users.primarySkill) LIKE LOWER(?)
            )
        `;
        values.push(`%${hasSkill}%`, `%${hasSkill}%`);
    }

    if (hasSkillLevel) {
        sql += `
            AND (
                userSkills.skillLevel = ? OR users.primarySkillLevel = ?
            )
        `;
        values.push(hasSkillLevel, hasSkillLevel);
    }

    if (wantsSkill) {
        sql += " AND (userSkills.type = 'želim' AND LOWER(userSkills.skill) LIKE LOWER(?))";
        values.push(`%${wantsSkill}%`);
    }

    if (wantsSkillLevel) {
        sql += " AND userSkills.skillLevel = ?";
        values.push(wantsSkillLevel);
    }

    sql += " GROUP BY users.id";

    console.log('SQL Query:', sql);
    console.log('Values:', values);

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Greška u pretrazi:', err);
            return res.status(500).json(err);
        }
        console.log('Search results:', results);
        if (results.length === 0) {
            return res.status(404).json("Nije pronađeno.");
        }
        res.json(results);
    });
};
