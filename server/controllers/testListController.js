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
      const _id = req.params.id;
      const test = await TestList.findById(_id).select('-questions.correct');
      const { testList: userTestList } = await User.findOne({ 'testList._id': _id }, { 'testList.$': 1 });
      const [array] = userTestList;
     
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
      const testList = await TestList.findById(testId).select('questions.correct');
      const user = await User.findOne({ 'testList._id': testId, email }, { 'testList.$': 1 });

      const correctAnswers = testList.questions.map(question => question.correct.toLowerCase());
    
      const userAnswers = answer.map(ans => ans.toLowerCase());
      let  correctCount = 1; 

      if(!user){
        return res.status(404).json({ message: 'test not found' });
      }

      if(user.testList[0].finish) {
        return res.status(400).json({ message: 'the test has already been passed' });
      }

      const result = userAnswers.map((userAns, index) => {
        let res = { 
          userAnswer: userAns,
          isCorrect: correctAnswers[index] === userAns
        }
        if(correctAnswers[index] === userAns){
          correctCount++
        }
        return res
      });
      
      let percentMark = correctCount * 100 / correctAnswers.length;
      let finalMark = correctAnswers.length * percentMark / 100;
      await User.updateOne(
        { 'testList._id': testId, "email": email },
        { 'testList.$.finish': true, 'testList.$.mark': finalMark, 'testList.$.result':result}
      );
      
      console.log(result);
      res.status(202).json({status: "success"});
    } catch (error) {
      res.status(400).json({ message: 'something went wrong' });
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
