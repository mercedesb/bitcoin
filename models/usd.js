const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usdSchema = new Schema({
  coin: String,
  value: Number,
  date: { type: Date, default: Date.now }
});


const Usd = mongoose.model('Usd', usdSchema );
module.exports = Usd;
