import mailchimp from 'mailchimp-api-v3';
import crypto from 'crypto';

//povežemo se sa mailchimpom preko api ključa u env
const mailchimpClient = new mailchimp(process.env.MAILCHIMP_API_KEY); 

export const subscribeToNewsletter = async (req, res) => {
    const { email } = req.body;
    const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');   
    //način na koji se provjerava da li je korisnik već prijavljen, heširamo e - mail i provjeravamo da li je u listi članova

    try {
        //provjerimo je li korisnik već prijavljen
        const result = await mailchimpClient.get(`/lists/dab0b38bbe/members/${emailHash}`)
        .then(result => {
                if (result.status === 'subscribed') {
                    //ako smo već prijavljeni, specifična poruka na toast - u
                    return res.status(200).json({ message: 'Već prijavljeni', status: 'already_subscribed' });
                }
            })

        .catch(async () => {
            //ako nema korisnika, prijavimo ga na newsletter
            await mailchimpClient.post(`/lists/dab0b38bbe/members`, {
                email_address: email,
                status: 'subscribed' //mijenjamo status
            });
            return res.status(200).json({ message: 'Uspješno prijavljen', status: 'subscribed' });
        });
    } catch (error) {
        console.error('Greška u prijavi:', error);
        res.status(500).send('Neuspješna prijava na newsletter.');
    }
};