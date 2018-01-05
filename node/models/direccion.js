var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DireccionSchema = new Schema(
  {
    calle: {type: Schema.ObjectId, ref: 'Calle', required: true},
    provincia: {type: Schema.ObjectId, ref: 'Provincia', required: true},
    altura: {type: Number, required: true},
    piso: {type: Number, required: true},
    departamento: {type: String, required: false, max: 4},
    barrio: {type: String, required: false, max: 30},
    codigo_postal: {type: Number, required: true},
    clientes: [{type: Schema.ObjectId, ref: 'Cliente'}]
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
