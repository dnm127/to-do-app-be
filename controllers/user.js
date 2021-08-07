require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { hashSalt } = require('../constants/user');

exports.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingEmail = await User.find({ email });
  const existingUsername = await User.find({ username });
  const errorMessage = [];

  if (existingEmail.length > 0) {
    errorMessage.push('Please try another email.');
  }
  if (existingUsername.length > 0) {
    errorMessage.push('Please try another username.');
  }

  if (existingEmail.length > 0 || existingUsername.length > 0) {
    return res.status(409).send(errorMessage.join('\n'));
  }

  const hashPassword = await bcrypt.hash(password, hashSalt);
  const user = new User({ username, email, password: hashPassword });

  return await user
    .save()
    .then((result) => {
      return res.status(200).send({
        username,
        email,
        // accessToken
      });
    })
    .catch((err) => {
      return res.send(err);
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUserByEmail = await User.findOne({ email });
  if (!existingUserByEmail) {
    return res.status(401).send('Email does not exist.');
  } else {
    const userPassword = existingUserByEmail.password;
    const { username } = existingUserByEmail;
    const validate = await bcrypt.compare(password, userPassword);
    if (validate) {
      const accessToken = jwt.sign(
        { username, email, password },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60s' }
      );
      return res
        .status(200)
        .cookie('todoAppToken', accessToken, { maxAge: 90000 })
        .send({ username, email, accessToken });
    } else {
      res.status(401).send('Incorrect password.');
    }
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie('todoAppToken');
  res.status(200).send('Logout');
};

exports.getLoggedInUser = (req, res, next) => {};
