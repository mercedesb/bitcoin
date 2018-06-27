const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comboSchema = new Schema({
  lexchange: String,
  rexchange: String,
  coincurrency: String,
  lhs: String,
  rhs: String,
  diff: String,
  usddiff: Number,
  usdlhs: Number,
  usdrhs: Number,
  date: { type: Date, default: Date.now }
});


const Combo = mongoose.model('Combo', comboSchema );

module.exports = Combo;