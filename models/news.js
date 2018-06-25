const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: String,
  pub_date:  String,
  url: String,
  date: { type: Date, default: Date.now }
});


const NewsModel = mongoose.model('NewsModel', newsSchema );
//module.exports = mongoose.model('CoinModel', coinSchema );
export default NewsModel;