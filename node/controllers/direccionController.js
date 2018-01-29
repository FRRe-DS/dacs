var Direccion = require('../models/direccion');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Direccions
exports.direccion_list = function(req, res) {
  Direccion.find()
  .populate('direccion')
  .exec(function (err, list_direccions) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('direccion_list', { title: 'Lista de Direccions', direccion_list: list_direccions });
  });
};

// Display detail page for a specific Direccion
exports.direccion_detail = function(req, res, next) {

    async.parallel({
        direccion: function(callback) {
            Direccion.findById(req.params.id)
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.direccion==null) { // No results.
            var err = new Error('Direccion not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('direccion_detail', { title: 'Direccion Detail', direccion: results.direccion } );
    });

};

// Display Direccion create form on GET
exports.direccion_create_get = function(req, res) {
    res.render('direccion_form', { title: 'Crear Direccion' });
};

// Handle Direccion create on POST
exports.direccion_create_post =  [

    // Validate that the name field is not empty.
    body('nombre', 'El nombre de la direccion es requerido').isLength({ min: 1 }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('nombre').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a direccion object with escaped and trimmed data.
        var direccion = new Direccion(
          { nombre: req.body.nombre }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('direccion_form', { title: 'Crear Direccion', direccion: direccion, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Verificar si la direccion existe
            Direccion.findOne({ 'nombre': req.body.nombre })
                .exec( function(err, found_direccion) {
                     if (err) { return next(err); }

                     if (found_direccion) {
                         //La direccion existe
                         res.redirect(found_direccion.url);
                     }
                     else {

                         direccion.save(function (err) {
                           if (err) { return next(err); }
                           //Direccion guardada, redireccionar al detalle
                           res.redirect(direccion.url);
                         });

                     }
                 });
        }
    }
];

// Display Direccion delete form on GET
exports.direccion_delete_get = function(req, res) {
  async.parallel({
      direccion: function(callback) {
          Direccion.findById(req.params.id).exec(callback)
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.direccion==null) { // No results.
          res.redirect('/direccion');
      }
      // Successful, so render.
      res.render('direccion_delete', { title: 'Borrar Direccion', direccion: results.direccion } );
  });
};

// Handle Direccion delete on POST
exports.direccion_delete_post = function(req, res, next) {

    async.parallel({
        direccion: function(callback) {
          Direccion.findById(req.body.direccionid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success

        Direccion.findByIdAndRemove(req.body.direccionid, function deleteDireccion(err) {
          if (err) { return next(err); }
            // Success - go to direccion list
            res.redirect('/direccion')
          })
    });
};
// Display Direccion update form on GET
exports.direccion_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Direccion update GET');
};

// Handle Direccion update on POST
exports.direccion_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Direccion update POST');
};
