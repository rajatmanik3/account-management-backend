var express = require('express');
var router = express.Router();
var transactionController = require('../controllers/transactionController.js');
var validator = require('../middleware/validator');

/*
 * GET
 */
router.get('/list', transactionController.list);

/*
 * POST
 */
router.post('/create', validator.validate('transaction'), transactionController.create);


module.exports = router;
