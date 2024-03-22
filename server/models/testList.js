const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: String,
  answers: [String],
  correct: String,
  _id: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
});

const UserAnswerSchema = new Schema({
  userAnswer: String,
  isCorrect: Boolean
})

const TestListSchema = new Schema({
  nameTest: {
    type: String,
    unique: true
  },
  questions: [QuestionSchema],
  result: [UserAnswerSchema]
});

const TestList = mongoose.model('test-list', TestListSchema);

module.exports = TestList;