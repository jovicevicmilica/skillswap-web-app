const express = require("express"); //uključimo express, framework za izgradnju web aplikacija u node.js
const nodemailer = require("nodemailer"); //biblioteka za slanje e-mailova
const cors = require("cors"); //middleware koji pomaže pristupitanju resursima na serveru sa drugih domena
const app = express();
const port = 3001; //port na kom server sluša zahtjeve

//pravimo express aplikaciju
app.use(cors()); 
app.use(express.json());

//ovo nije neophodno ipak jer koristimo cors, pa se ne mora manuelno postavljati zaglavlje
// app.use((req, res, next) => {
//     res.setHeader('Acces-Control-Allow-Origin', "*");
//     next();
// });

app.post("/send-email", (req, res) => { //kada se izvrši HTTP POST zahtjev na ovu rutu, express će izvršiti odgovarajuću funkciju koja je zadužena za slanje e-maila
    //preuzimamo podatke iz tijela zahtjeva (req.body)
    const { email, subject, message } = req.body;

    var transporter = nodemailer.createTransport({ //kreira se transporter našeg e-maila
        service: "gmail", //servis za slanje
        auth: { //autentifikacija, u ovom slučaju će se s mog mejla i slati i primati poruke, ali će se napraviti simulacija koju ću objasniti ispod
            user: "skillswap24@gmail.com",
            pass: "remx lerr hjiy vaog", 
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

app.listen(port, () => { //pokretanje express servera koji sluša na određenom portu koji smo postavili, ako je uspješno povezano štampa poruku u konzoli da nas obavijesti
  console.log(`Server sluša na http://localhost:${port}`);
});
