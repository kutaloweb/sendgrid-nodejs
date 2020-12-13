var express = require('express');
var router = express.Router();
var sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* Send email with SendGrid. */
router.post('/', function (req, res, next) {
    var {name, fromEmail, subject, body, phone} = req.body;
    const msg = {
        to: process.env.RECIPIENT_EMAIL,
        from: process.env.SENDGRID_SENDER_EMAIL,
        subject: subject,
        text: body,
        html: `
            <p>Hi ${process.env.RECIPIENT_NAME},</p>    
            <p>Here is your email from ${name}:</p>
            <p>${body}</p>
            <p>${phone}, ${fromEmail}</p>
            `,
    };
    sgMail.send(msg).then((response) => {
        res.status(200).send({status: "Sent"});
    }).catch((err) => {
        res.status(400).send({status: "Not Sent", error: err});
    });
});

module.exports = router;
