var Cliente = require('../models/cliente');
var Calle = require('../models/calle');
var Direccion = require('../models/direccion');
var Provincia = require('../models/provincia');

var async = require('async');

// Display list of all Clientes
exports.index = function(req, res) {
  async.parallel({
      cliente_count: function(callback) {
          Cliente.count(callback);
      },
      calle_count: function(callback) {
          Calle.count(callback);
      },
      direccion_count: function(callback) {
          Direccion.count(callback);
      },
      provincia_count: function(callback) {
          Provincia.count(callback);
      },
  }, function(err, results) {
      res.render('index', { title: 'Desarrollo de Aplicaciones Cliente-Servidor', error: err, data: results });
  });
};
