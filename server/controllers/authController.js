const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { ACCESS_TOKEN_SECRET } = require('dotenv').config().parsed;

const  User = require('../models/auth');

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: "48h"});
}

class AuthController {

  async registration(req, res) {
    try {
      const errors = validationResult(req)
      
      if(!errors.isEmpty()) {
        return res.status(400).json({ message: 'invalid registration', errors})
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({email})

      if(candidate) {
        return res.status(400).json({ message: 'This user already exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ email, password: hashPassword});
      
      await user.save();
      return res.json({ message: 'User create' });
    } catch (error) {
      res.status(400).json({ message: 'Registration Error', error })
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if(!user) {
        return res.status(404).json({ message: `User ${email} not found` });
      }
      
      const validPassword = bcrypt.compareSync(password, user.password);
      if(!validPassword) { 
        return res.status.json({ message: "incorrect password" });
      }
      
      const token = generateAccessToken(user._id);
      return res.json({ token })
    } catch (error) {
      res.status(400).json({ message: 'Login error' });
    }
  };

}

module.exports = new AuthController()