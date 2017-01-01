var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HouseSchema = new Schema({
  _id: String,
  date: Date,
  currency: {
    type: String,
    enum: ['MXN', 'USD']
  },
  isFromCompany: Boolean,
  name: String,
  price: Number
});

module.exports = mongoose.model('House', HouseSchema);