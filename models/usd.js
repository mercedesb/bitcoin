const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usdSchema = new Schema({
  coin: String,
  value:  String,
  date: { type: Date, default: Date.now }
});


const UsdModel = mongoose.model('UsdModel', usdSchema );
//module.exports = mongoose.model('CoinModel', coinSchema );
export default UsdModel;