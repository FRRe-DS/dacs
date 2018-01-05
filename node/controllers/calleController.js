var Calle = require('../models/calle');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Calles
exports.calle_list = function(req, res) {
  Calle.find()
  .populate('calle')
  .exec(function (err, list_calles) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('calle_list', { title: 'Lista de Calles', calle_list: list_calles });
  });
};

// Display detail page for a specific Calle
exports.calle_detail = function(req, res, next) {

    async.parallel({
        calle: function(callback) {
            Calle.findById(req.params.id)
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.calle==null) { // No results.
            var err = new Error('Calle not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('calle_detail', { title: 'Calle Detail', calle: results.calle } );
    });

};

// Display Calle create form on GET
exports.calle_create_get = function(req, res) {
    res.render('calle_form', { title: 'Crear Calle' });
};

// Handle Calle create on POST
exports.calle_create_post =  [

    // Validate that the name field is not empty.
    body('nombre', 'El nombre de la calle es requerido').isLength({ min: 1 }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('nombre').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a calle object with escaped and trimmed data.
        var calle = new Calle(
          { nombre: req.body.nombre }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('calle_form', { title: 'Crear Calle', calle: calle, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Verificar si la calle existe
            Calle.findOne({ 'nombre': req.body.nombre })
                .exec( function(err, found_calle) {
                     if (err) { return next(err); }

                     if (found_calle) {
                         //La calle existe
                         res.redirect(found_calle.url);
                     }
                     else {

                         calle.save(function (err) {
                           if (err) { return next(err); }
                           //Calle guardada, redireccionar al detalle
                           res.redirect(calle.url);
                         });

                     }
                 });
        }
    }
];

// Display Calle delete form on GET
exports.calle_delete_get = function(req, res) {
  async.parallel({
      calle: function(callback) {
          Calle.findById(req.params.id).exec(callback)
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.calle==null) { // No results.
          res.redirect('/calle');
      }
      // Successful, so render.
      res.render('calle_delete', { title: 'Borrar Calle', calle: results.calle } );
  });
};

// Handle Calle delete on POST
exports.calle_delete_post = function(req, res, next) {

    async.parallel({
        calle: function(callback) {
          Calle.findById(req.body.calleid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success

        Calle.findByIdAndRemove(req.body.calleid, function deleteCalle(err) {
          if (err) { return next(err); }
            // Success - go to calle list
            res.redirect('/calle')
          })
    });
};
// Display Calle update form on GET
exports.calle_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Calle update GET');
};

// Handle Calle update on POST
exports.calle_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Calle update POST');
};
