const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const authShema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: false,
    required: true
  },
  testList: [
    {
      nameTest: {
        type: String,
        required: true,
        unique: true,
        ref: 'test-list'
      },
      finish: {
        type: Boolean,
        required: true,
        default: false
      },
      mark: {
        type: Number,
        required: true
      }
    }
  ]
});

const Auth = mongoose.model('user', authShema);

module.exports = Auth;
