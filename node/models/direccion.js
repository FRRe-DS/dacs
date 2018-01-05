var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DireccionSchema = new Schema(
  {
    //TODO agregar los campos de direccion
    nombre: {type: String, required: true, min: 1, max: 50},
  }
);

// URL para acceder a un direccion
DireccionSchema
.virtual('url')
.get(function () {
  return '/direccion/' + this._id;
});

//Export model
module.exports = mongoose.model('Direccion', DireccionSchema);
