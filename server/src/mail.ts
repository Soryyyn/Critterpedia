import path from "path";
require('dotenv').config({ path: path.resolve(process.cwd(), "server", ".env") });
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
