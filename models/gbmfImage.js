var mongoose = require("mongoose");

var gbmfImageSchema = new mongoose.Schema({
  id: String,
  date: String,
  url: String,
  src: String,
  location: {
    latitude: Number,
    longitude: Number
  }
});

var gbmfImage = mongoose.model('gbmfImage', gbmfImageSchema);

module.exports = {
  gbmfImage: gbmfImage
}
