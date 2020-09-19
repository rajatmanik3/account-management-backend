const { check } = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'transaction':
        {
            return [
                check('transactionType').not().isEmpty().withMessage('Please select transaction type'),
                check('amount').not().isEmpty().withMessage('Please enter amount'),
                check('description').not().isEmpty().withMessage('Please enter description')
            ]
        }
    }
}