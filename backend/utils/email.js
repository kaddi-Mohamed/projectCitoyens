const nodemailer = require("nodemailer");
require("dotenv").config();
const config = require("config");
const fs = require("fs");
const ejs = require("ejs");

const sendEmail = async (email, subject, token, urlTemplate) => {
  try {
    let emailTemplate = await fs.readFileSync(urlTemplate, "utf-8");
    emailTemplate = ejs.compile(emailTemplate);
    emailTemplate = emailTemplate({ token: token });
    const transporter = nodemailer.createTransport({
      service: config.get("service"),
      auth: {
        user: config.get("adminEmail"),
        pass: config.get("password"),
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: emailTemplate,
    });
    console.log("email send sucessfully");
  } catch (error) {
    console.log("email not send", error);
  }
};

module.exports = sendEmail;
