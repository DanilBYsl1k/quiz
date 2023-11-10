const Router = require('express');

const controller = require('../controllers/testListController');
const router = new Router;

router.get('/test/:id', controller.getTest);
router.get('/list/:user', controller.getTestList);  

router.post('/finish', controller.testFinish);
router.post('/result', controller.testResult);


module.exports = router;

