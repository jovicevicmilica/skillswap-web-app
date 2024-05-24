import nodemailer from 'nodemailer';

//asinhrono slanje mejla
export const sendEmail = async (req, res) => {
    const { email, subject, message } = req.body;

    //nodemailer transporter
    const transporter = nodemailer.createTransport({ //pravimo transportera za naš mejl
        service: 'gmail', //servis za slanje
        auth: { //autentifikacija, u ovom slučaju će se s mog mejla i slati i primati poruke, ali će se napraviti simulacija koju ću objasniti ispod
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //email konfiguracija
    const mailConfigs = {
        from: "skillswap24@gmail.com", //ovo će biti email adresa pošiljaoca, iako smo stavili da klijent šalje mejl
        //ovo se radi zbog privatnosti, ali ću napraviti da se zna od koga je stiglo, i kome da se odgovori na pitanje
        replyTo: email, //odgovaramo na mejl klijenta na poruku koja pristigne
        to: "skillswap24@gmail.com", //kome se šalje
        subject: subject,
        text: `Poslato od: ${email}\nPoruka: ${message}`, //da bi znali od koga je poruka jer smo mi "zvanični" pošiljalac
    };

    //funkcija koja šalje mejl
    try {
        const info = await transporter.sendMail(mailConfigs); //šaljemo mejl
        res.status(200).send("E-mail poslat uspješno: " + info.response);
    } catch (error) {
        console.error(error);
        res.status(500).send("Desila se greška: " + error.message);
    }
};
