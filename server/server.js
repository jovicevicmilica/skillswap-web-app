//ovdje ce ici glavna logika za server, a pojedinosti ce ici u zasebnim fajlovima
//npr. mail.js ce sadrzati sve za kontakt, a newsletter.js za newsletter
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001 || process.env.port; //port na kojem server sluša zahtjeve

//pravimo express aplikaciju
app.use(cors());
app.use(express.json());

//uključimo rute iz drugih fajlova
const mailRoutes = require("./mail"); 
const newsletterRoutes = require("./newsletter"); 

//koristimo rute iz drugih fajlova
app.use("/api/mail", mailRoutes);
app.use("/api/newsletter", newsletterRoutes);

app.listen(port, () => { //pokretanje express servera koji sluša na određenom portu koji smo postavili, ako je uspješno povezano štampa poruku u konzoli da nas obavijesti
  console.log(`Server sluša na http://localhost:${port}`);
});
