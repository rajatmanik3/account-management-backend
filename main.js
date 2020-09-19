const mongoose = require('mongoose');
const config = require('config');
mongoose.connect('mongodb://localhost/appwrk', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});