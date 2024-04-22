const express = require('express');
const router = express.Router();
const mailchimp = require('mailchimp-api-v3');
const crypto = require("crypto"); //da provjerimo je li korisnik već prijavljen

const mailchimpClient = new mailchimp(process.env.MAILCHIMP_API_KEY);

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  try {
    //provjerimo da li već postoji
    const result = await mailchimpClient.post(`/lists/dab0b38bbe/members/${emailHash}`);
    if (result.status === 'subscribed') {
      return res.status(200).send('Već ste prijavljeni.');
    }

    //ako postoji, ali nije prijavljen
    if (result.status !== 'subscribed') {
      await mailchimpClient.patch(`/lists/dab0b38bbe/members/${emailHash}`, {
        status: 'subscribed'
      });
      return res.status(200).send('Ažurirana prijava na mjesečne novosti.');
    }
    
  } catch (error) { 
    //ako ne postoji, dodati ga
    if (error.status === 404) {
      await mailchimpClient.post(`/lists/dab0b38bbe/members`, {
        email_address: email,
        status: 'subscribed'
      });
      return res.status(200).send('Uspješna prijava na mjesečne novosti.');
    }

    console.error('Neuspješna prijava na mjesečne novosti:', error);
    res.status(500).send('Neuspješna prijava na mjesečne novosti.');
  }
});

router.post('/unsubscribe', async (req, res) => {
  const { email } = req.body;
  const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
  
  try {
    await mailchimpClient.patch(`/lists/dab0b38bbe/members/${emailHash}`, {
      status: 'unsubscribed'
    });
    res.status(200).send('Uspješna odjava sa mjesečnih novosti.');
  } catch (error) {
    console.error('Neuspješna odjava sa mjesečnih novosti:', error);
    res.status(500).send('Neuspješna odjava sa mjesečnih novosti.');
  }
});

module.exports = router;
