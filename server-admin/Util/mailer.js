const nodeMailer = require("nodemailer");

const sendMail = (to, subject, text , htmlContent) => {
    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'ngogiang190201@gmail.com', // generated ethereal user
          pass: 'wftrrkboynjifqym', // generated ethereal password
        },
    });

    const options = {
        from : 'ngogiang190201@gmail.com',
        to : to,
        text : text,
        subject : subject,
        html : htmlContent
    }

    return transporter.sendMail(options);
}

module.exports = {
    sendMail
}
