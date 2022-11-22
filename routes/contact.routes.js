const router = require("express").Router();
const User = require("../models/User.model");

//Following is for the contact form
const nodeMailer = require('nodemailer');
const { request } = require("express");

// Get contact page
router.get("/contact", (req, res, next) => {
    res.render('information/contact.hbs')
})

router.post("/contact", (req, res, next) => {
    console.log("EMAILADRESS!!!!!!!!!!!!!!!!", req.body.email);
    const transporter = nodeMailer.createTransport({
        service: "Hotmail",
        auth: {
            user:"ironhackproject22@hotmail.com",
            pass:"Ber22ironhack.",
        },
    })

    const mailOptions = {
        from: "ironhackproject22@hotmail.com",
        to: "ironhackproject22@hotmail.com",
        subject: req.body.subject,
        text: `You got a message from
        Email: ${req.body.email}
        Message: ${req.body.message}`

    };

    const mailResponse = {
        from: "ironhackproject22@hotmail.com",
        to: req.body.email,
        subject: "Email sent confirmation",
        text: `We have received your email and you'll be contacted shortly!\n${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            
            res.send('error')
        } else {
            console.log('Message sent successfuly!')
            transporter.sendMail(mailResponse,(error, info))
            setTimeout(function() { alert("Sent!"); }, 3000);
            res.redirect("/contact")
            setTimeout(function() { alert("Sent!"); }, 3000);
        }
    });
});

module.exports = router;