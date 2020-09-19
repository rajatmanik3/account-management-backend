const path = require("path");
require('dotenv').config()

const express = require('express')
require('./main');
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const cors = require('cors');
const transaction = require('./routes/transactionRoutes');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/transaction', transaction);

app.listen(port, () => {
  console.log(`Appwrk account-management app listening at http://localhost:${port}`)
})