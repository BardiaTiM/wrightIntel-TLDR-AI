const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/forgot-password', (req, res) => {
  res.status(200).send('Forgot password route');
});


router.post('/forgot-password', async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: email_user,
          pass: email_password


      }
  });
  
  const { email } = req.body;

  // Generate a unique token for the user
  const token = await bcrypt.hash(email + Date.now(), saltRounds);

  // Store the token in the database along with the user's email and a timestamp
  await userCollection.updateOne(
    { email },
    { $set: { passwordResetToken: token, passwordResetExpires: Date.now() + 3600000 } }
  );

  // Send an email to the user with a link to the password reset page
  const resetUrl = `http://localhost:4056/reset-password?token=${token}`;
  const mailOptions = {
    from: email_user,
    to: email,
    subject: 'Reset your password',
    html: `Click <a href="${resetUrl}">here</a> to reset your password.`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to send email');
    } else {
      res.status(200).send('Email sent');
    }
  });
});


module.exports = router;
