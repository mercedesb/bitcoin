const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  input: Object,
  output: String,
  date: { type: Date, default: Date.now },
});


const Exchange = mongoose.model('Exchange', exchangeSchema );
//module.exports = mongoose.model('CoinModel', coinSchema );
module.exports = Exchange;