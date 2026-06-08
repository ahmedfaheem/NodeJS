const nodemailer = require("nodemailer");
const APIError = require("../utils/APIError");
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

const sendMail = async (data, templateName) => {

    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
    } catch (Error) {
        throw new APIError("Verification failed:", 301)
    }
    let htmlToSend = "";
    try {
        const templatePath = path.join(__dirname, `../views/emails/${templateName}.view.ejs`);
        htmlToSend = await ejs.renderFile(templatePath, data);
    } catch (error) {
        throw new APIError("Email Error Not Found", 401)
    }


    try {
        const info = await transporter.sendMail({
            from: '"Lab_ExpressJS" <Developer@gmail.com>',
            to: data.to,
            subject: data.subject, // subject line
            html: htmlToSend, // HTML body
        });
        console.log("Email Sent")
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}


module.exports = sendMail;

