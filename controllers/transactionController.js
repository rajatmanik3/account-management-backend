var Transaction = require('../models/transactionModel.js');

const { validationResult } = require('express-validator');

var mongoose = require('mongoose');

/**
 * transactionController.js
 *
 * @description :: Server-side logic for managing transactions.
 */
module.exports = {

    /**
     * transactionController.create()
     */
    create: async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                error: errors.array(),
                status: false,
                message: errors.array()[0].msg
            });
        }

        let transaction;

        // Initialize running-balance and new-balance
        let runningBalance = 0;
        let newBalance = 0;
        try {

            const { transactionType, amount, description } = req.body;
    
            // Get Last Transaction Detail
            let lastTransaction = await Transaction.find()
            .sort({ updatedAt: -1})
            .limit(1);

            // Update running-balance with that of last transaction, if any
            if (lastTransaction.length) {
                runningBalance = lastTransaction[0].runningBalance;
            }

            // Update new-balance according to the transaction-type
            if(transactionType === 'Credit') {
                newBalance = runningBalance + amount;
            } else if(transactionType === 'Debit' && runningBalance >= amount) {
                newBalance = runningBalance - amount;
            } else {
                // Notify less available balance, if less than debit amount
                return res.status(400).json({
                    status: false,
                    message: 'Available balance is '+runningBalance,
                });
            }

            // Create new transaction
            transaction = await Transaction.create({
                transactionType: transactionType,
                amount: amount,
                description: description,
                runningBalance: newBalance
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                error: err,
                status: false,
                message: 'Something went wrong',
            });
        }

        return res.status(200).json({
            data: transaction.toJSON(),
            status: true,
            message: 'Transaction done successfuuly'
        });
    },

     /**
     * transactionController.list()
     */
    list: async function (req, res) {

        let transactions;
        try {
            
            transactions = await Transaction.find()
            .sort({ updatedAt: -1 })
            .limit(30);

        } catch (err) {
            return res.status(500).json({
                error: err,
                status: false,
                message: 'Something went wrong',
            });
        }

        return res.status(200).json({
            data: transactions,
            status: true,
            message: 'Transactions'
        });
    }
};