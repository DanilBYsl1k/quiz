const TestList = require('../models/testList');
const User = require('../models/auth');

class TestListController {
  async getTestList(req, res) {
    try {
      const testList = await TestList.find({}, 'nameTest');
      const user = await User.findOne({email: req.params['user']})

      if(!user){
        return res.status(404).json({error: 'user not found'})
      }

      const { testList: userTestList, _id } = user;

      if(userTestList.length < 1) {
        await User.updateOne({ _id: _id }, { $push: { testList } });
      }

      const { testList: userTests } = await User.findOne({email: req.params['user']})

      res.status(202).json(userTests);
    } catch (error) {
      return res.status(404).json({error: 'something went wrong'})
    }
  };

  async getTest(req, res) {
    try {
      const { id, email } = req.params;
      const test = await TestList.findById(id).select('-questions.correct');
      const {testList: list} = await User.findOne({ 'testList._id': id, 'email': email }, { 'testList.$': 1 });
      const [ array ] = list;

      if(!test) {
        return res.status(404).json({ message: 'test not found' });
      }
      if(array.finish) {
        return res.status(400).json({ message: 'test was finish' });
      }
      res.status(200).json(test)
    } catch (error) {
      res.status(404).json({ message: 'test not found' });
    }
  };

  async testFinish(req, res) {
    try {
      const { id: testId, answer, email } = req.body;
      const correctAnswers = await TestList.findById(testId).select('questions.correct');
      const user = await User.findOne({ 'testList._id': testId, email }, { 'testList.$': 1 });
      const userAnswers = answer.map((obj)=> {
        obj.answer = obj.answer.toLowerCase()
        return obj;
      });


      let correctCount = 1; 

      if(!user){
        return res.status(404).json({ message: 'test not found' });
      }

      if(user.testList[0].finish) {
        return res.status(400).json({ message: 'the test has already been passed' });
      }

      for (let index = 0; index < userAnswers.length; index++) {
        const { id, answer: answers } = userAnswers[index];
        const { questions } = await TestList.findOne(
          { "questions": { $elemMatch: { "_id": id } } },
          { "questions.$": 1 } 
        );
        const question = questions[0].correct.toLowerCase();

        if(question === answers) {
          correctCount++
        }
      }

      let percentMark = correctCount * 100 / correctAnswers.questions.length;
      let finalMark = correctAnswers.questions.length * percentMark / 100;
      await User.updateOne(
        { 'testList._id': testId, "email": email },
        { 'testList.$.finish': false, 'testList.$.mark': finalMark}
      );

      res.status(202).json({status: "success"});
    } catch (error) {
      res.status(400).json({ message: 'something went wrong', error });
    } 
  }

  async testResult(req, res) {
    try {
      const { id: testId, email } = req.body;
      const user = await User.findOne({ 'testList._id': testId, email }, { 'testList.$': 1 });

      res.status(202).json(user.testList[0]);
    } catch (error) {
      res.status(400).json({ message: 'result not found', error });
    }
  };
};

module.exports = new TestListController();


// ///////////////////////
// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

// const testLists = await TestList.find();

// // Обновить каждый документ
// testLists.forEach(async (testList) => {
//   testList.questions.forEach((question) => {
//     if (!question._id) {
//       question._id = new ObjectId();
//     }
//   });

//   await TestList.updateOne({ _id: testList._id }, { $set: { questions: testList.questions } });
// });

//////////////////