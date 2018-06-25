const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  title: String,
  url:  String,
  description: String,
  date: { type: Date, default: Date.now }
});


const ExchangeModel = mongoose.model('ExchangeModel', exchangeSchema );
//module.exports = mongoose.model('CoinModel', coinSchema );
export default ExchangeModel;