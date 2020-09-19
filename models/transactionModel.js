var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var transactionSchema = new Schema({
	'transactionType' : String,
	'amount' : Number,
    'description' : String,
    'runningBalance' : String
}, {
    timestamps: true
});

module.exports = mongoose.model('transaction', transactionSchema);
