var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClienteSchema = new Schema(
  {
    numero_documento: {type: Number, required: true, min: 1, max: 999999999999999},
    cuit_cuil: {type: Number, required: true, min: 1, max: 999999999999999},
    primer_nombre: {type: String, required: true, min: 1, max: 50},
    apellido: {type: String, required: true, min: 1, max: 50},
    sexo: {type: String, required: true, enum: ['Masculino', 'Femenido'], default: 'Femenido'},
    fecha_nacimiento: {type: Date, default: Date.now},
    direcciones: [{type: Schema.ObjectId, ref: 'Direccion'}]
  }
);

// URL para acceder a un cliente
ClienteSchema
.virtual('url')
.get(function () {
  return '/cliente/' + this._id;
});

//Export model
module.exports = mongoose.model('Cliente', ClienteSchema);
