var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProvinciaSchema = new Schema(
  {
    nombre: {type: String, required: true, min: 1, max: 50},
  }
);

// URL para acceder a un provincia
ProvinciaSchema
.virtual('url')
.get(function () {
  return '/provincia/' + this._id;
});

//Export model
module.exports = mongoose.model('Provincia', ProvinciaSchema);
