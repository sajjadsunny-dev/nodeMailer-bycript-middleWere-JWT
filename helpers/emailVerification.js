const nodemailer = require("nodemailer");

async function emailVerify(email) {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "sajjadhossainsunny.dev@gmail.com",
         pass: "tnvpedrjkajodogj",
      },
   });

   const info = await transporter.sendMail({
      from: '"Fred Foo 👻" sajjadhossainsunny.dev@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
   });
}

module.exports = emailVerify