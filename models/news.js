const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: String,
  pub_date:  String,
  url: String,
  date: { type: Date, default: Date.now }
});


const News = mongoose.model('News', newsSchema );
//module.exports = mongoose.model('CoinModel', coinSchema );
module.exports = News;