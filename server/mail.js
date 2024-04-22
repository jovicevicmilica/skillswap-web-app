const express = require("express");
const cors = require("cors");
const router = express.Router();
const nodemailer = require("nodemailer");
router.use(cors());

//ovo nije neophodno ipak jer koristimo cors, pa se ne mora manuelno postavljati zaglavlje
// app.use((req, res, next) => {
//     res.setHeader('Acces-Control-Allow-Origin', "*");
//     next();
// });

router.post("/send-email", (req, res) => { //kada se izvrši HTTP POST zahtjev na ovu rutu, express će izvršiti odgovarajuću funkciju koja je zadužena za slanje e-maila
    //preuzimamo podatke iz tijela zahtjeva (req.body)
    const { email, subject, message } = req.body;

    var transporter = nodemailer.createTransport({ //kreira se transporter našeg e-maila
        service: "gmail", //servis za slanje
        auth: { //autentifikacija, u ovom slučaju će se s mog mejla i slati i primati poruke, ali će se napraviti simulacija koju ću objasniti ispod
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailConfigs = { //parametri e-maila
        from: "skillswap24@gmail.com", //ovo će biti email adresa pošiljaoca, iako smo stavili da klijent šalje mejl
        //ovo se radi zbog privatnosti, ali ću napraviti da se zna od koga je stiglo, i kome da se odgovori na pitanje
        replyTo: email, //odgovaramo na mejl klijenta na poruku koja pristigne
        to: "skillswap24@gmail.com", //kome se šalje
        subject: subject, //predmet
        text: `Poslato od: ${email}\nPoruka: ${message}`, //da bi znali od koga je poruka jer smo mi "zvanični" pošiljalac
    };

    transporter.sendMail(mailConfigs, function(error, info) { //funkcija koja šalje mejl
        if (error) {
            console.log(error); //štampa grešku u konzoli
            return res.status(500).send("Desila se greška: " + error.message); //u slučaju neuspjelog slanja poruke šalje status 500 sa porukom o grešci
        }
        res.status(200).send("E-mail poslat uspješno: " + info.response); //u slučaju uspješnog slanja poruke šalje se status 200
    });
});

//da bi ukljucili ruter u server.js
module.exports = router;