const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comboSchema = new Schema({
  lexchange: String,
  lurl: String,
  rexchange: String,
  rurl: String,
  coin: String,
  currency:  String,
  lhs: String,
  rhs: String,
  diff: String,
  usddiff: Number,
  usdlhs: Number,
  usdrhs: Number,
  date: { type: Date, default: Date.now }
});


const ComboModel = mongoose.model('ComboModel', comboSchema );

export default ComboModel;