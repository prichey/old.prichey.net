var mongoose = require("mongoose");

var gbmfImageSchema = new mongoose.Schema({
  complete: Boolean,
  id: String,
  date: String,
  url: String,
  src: String,
  fullSrc: String,
  location: {
    latitude: Number,
    longitude: Number
  }
});

var gbmfImage = mongoose.model('gbmfImage', gbmfImageSchema);

module.exports = {
  gbmfImage: gbmfImage
}
