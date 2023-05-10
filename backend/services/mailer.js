const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "maingocanh25032002@gmail.com",
    pass: "ccoakfwuzzovgzpw",
  }
})

const sendSGMail = async ({
  from,
  to,
  subject,
  html,
  attachments,
  text,
}) => {
  try {

    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      html: html,
      text: text,
      attachments,
    };

    return transporter.sendMail(msg);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
