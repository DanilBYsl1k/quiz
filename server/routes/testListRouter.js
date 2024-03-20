const { Router } = require('express');
const controller = require('../controllers/testListController');

const router = Router();

router.get('/testList/list/:user', controller.getTestList);
router.get('/testList/test/:id/:email', controller.getTest);
router.post('/testList/finish', controller.testFinish);
router.post('/testList/result', controller.testResult);

module.exports = router;