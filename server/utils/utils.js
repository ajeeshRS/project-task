const nodemailer = require("nodemailer");

const sendConfirmationMail = (email) => {
  try {
    // Create a transporter using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "me.ajeesh7979@gmail.com",
        pass: process.env.APP_SECRET,
      },
      secure: false,
    });

    // mail options
    const mailOptions = {
      from: "me.ajeesh7979@gmail.com",
      to: email,
      subject: "Confirmation of Your Form Submission",
      text: email,
      html: `
          <p>Thank you for contacting us. We have successfully received your form submission and will review your message as soon as possible.</p>
          <p style="font-style: italic;">This is an automatically generated email. Please do not reply.</p>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendConfirmationMail;
