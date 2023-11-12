const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testListShema = new Schema({
  nameTest: {
    type:String,
    unique: false
  },
  finish: Boolean,
  mark: Number
})

const authSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  testList: [testListShema],
});

const Auth = mongoose.model('user', authSchema);

module.exports = Auth;