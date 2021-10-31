const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

//static files
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.post('/send', function (req, res) {
    const output = `
        <h3>Name: ${req.body.first} ${req.body.last}</h3>
        <h4>Email: ${req.body.email}</h4>
        <h4>Phone: ${req.body.mobile}</h4>
        <h3>Message: </h3>
        <p>${req.body.msg}</p>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '???@gmail.com',
            pass: '???'
        }
    });
    
    let info = {
        from: '"Contact Page" <???@gmail.com>',
        to: "???@gmail.com",
        subject: "Contact Request",
        text: "",
        html: output
    };

    transporter.sendMail(info, () => {
        res.redirect('/');
    });
});


app.listen(80);