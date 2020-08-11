// if in local enviroment load local env
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// let mailOptions = {
//     from: `Soryn Bächli <${process.env.MAIL_USER}>`,
//     to: "soryn.baechli@gmail.com",
//     subject: "test mail 🚑 (again...)",
//     text: "it works!"
// }

// transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//         console.log(`error when sending mail:\n${err}`);
//     } else {
//         console.log("sent mail sucessfully.");
//     }
// });