const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/reset-password', async (req, res) => {
  const { token } = req.query;
  
  // Find the user with the given token and ensure that the token hasn't expired
  const user = await userCollection.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).send('Invalid or expired token');
  }

  res.status(200).send('Reset password route');
});

router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  
  // Find the user with the given token and ensure that the token hasn't expired
  const user = await userCollection.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).send('Invalid or expired token');
  }

  // Update the user's password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await userCollection.updateOne(
    { email: user.email },
    { $set: { password: hashedPassword } }
  );

  // Remove the password reset token and expiration time from the user's record
  await userCollection.updateOne(
    { email: user.email },
    { $unset: { passwordResetToken: 1, passwordResetExpires: 1 } }
  );

  res.status(200).send('Password reset successfully');
});

module.exports = router;
