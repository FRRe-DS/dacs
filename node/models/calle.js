var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CalleSchema = new Schema(
  {
    nombre: {type: String, required: true, max: 45},
    direcciones: [{type: Schema.ObjectId, ref: 'Direccion'}]
  }
);

// URL para acceder a una calle
CalleSchema
.virtual('url')
.get(function () {
  return '/calle/' + this._id;
});

//Export model
module.exports = mongoose.model('Calle', CalleSchema);
