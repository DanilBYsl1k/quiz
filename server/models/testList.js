const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: String,
  answers: [String],
  correct: String
});

const TestListSchema = new Schema({
  nameTest: String,
  questions: [QuestionSchema]
});

const TestList = mongoose.model('test-list', TestListSchema);

module.exports = TestList;