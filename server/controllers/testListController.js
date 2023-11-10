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
        await User.updateOne({ _id: _id }, { $set: { testList } });
      }

      res.status(202).json(userTestList);
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
        return res.status(400).json({ message: 'test not found' });
      }

      if(array.finish) {
        return res.status(400).json({ message: 'test was finish' });
      }

      res.status(200).json(test)
    } catch (error) {
      res.status(400).json({ message: 'test not found' });
    }
  };

  async testFinish(req, res) {
    try {
      const { id: testId, answer, email } = req.body;
      const testList = await TestList.findById(testId).select('questions.correct');
      const correctAnswers = testList.questions.map(question => question.correct.toLowerCase());

      const userAnswers = answer.map(ans => ans.toLowerCase());

      const result = userAnswers.map((userAns, index) => ({
        userAnswer: userAns,
        isCorrect: correctAnswers[index] === userAns

      }));
      console.log(correctAnswers)
      console.log('Результаты проверки ответов:', result);

      res.status(202).json({status: "success"});
    } catch (error) {
      res.status(400).json({ message: 'something went wrong' });
    } 
  }

  async testResult(req, res) {
    try {
      
      res.status(202).json();
    } catch (error) {
      res.status(400).json({ message: 'result not found', error });
    }
  };
};

module.exports = new TestListController()
