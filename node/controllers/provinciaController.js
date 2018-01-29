var Provincia = require('../models/provincia');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Provincias
exports.provincia_list = function(req, res) {
  Provincia.find()
  .populate('provincia')
  .exec(function (err, list_provincias) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('provincia_list', { title: 'Lista de Provincias', provincia_list: list_provincias });
  });
};

// Display detail page for a specific Provincia
exports.provincia_detail = function(req, res, next) {

    async.parallel({
        provincia: function(callback) {
            Provincia.findById(req.params.id)
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.provincia==null) { // No results.
            var err = new Error('Provincia not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('provincia_detail', { title: 'Provincia Detail', provincia: results.provincia } );
    });

};

// Display Provincia create form on GET
exports.provincia_create_get = function(req, res) {
    res.render('provincia_form', { title: 'Crear Provincia' });
};

// Handle Provincia create on POST
exports.provincia_create_post =  [

    // Validate that the name field is not empty.
    body('nombre', 'El nombre de la provincia es requerido').isLength({ min: 1 }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('nombre').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a provincia object with escaped and trimmed data.
        var provincia = new Provincia(
          { nombre: req.body.nombre }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('provincia_form', { title: 'Crear Provincia', provincia: provincia, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Verificar si la provincia existe
            Provincia.findOne({ 'nombre': req.body.nombre })
                .exec( function(err, found_provincia) {
                     if (err) { return next(err); }

                     if (found_provincia) {
                         //La provincia existe
                         res.redirect(found_provincia.url);
                     }
                     else {

                         provincia.save(function (err) {
                           if (err) { return next(err); }
                           //Provincia guardada, redireccionar al detalle
                           res.redirect(provincia.url);
                         });

                     }
                 });
        }
    }
];

// Display Provincia delete form on GET
exports.provincia_delete_get = function(req, res) {
  async.parallel({
      provincia: function(callback) {
          Provincia.findById(req.params.id).exec(callback)
      },
  }, function(err, results) {
      if (err) { return next(err); }
      if (results.provincia==null) { // No results.
          res.redirect('/provincia');
      }
      // Successful, so render.
      res.render('provincia_delete', { title: 'Borrar Provincia', provincia: results.provincia } );
  });
};

// Handle Provincia delete on POST
exports.provincia_delete_post = function(req, res, next) {

    async.parallel({
        provincia: function(callback) {
          Provincia.findById(req.body.provinciaid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success

        Provincia.findByIdAndRemove(req.body.provinciaid, function deleteProvincia(err) {
          if (err) { return next(err); }
            // Success - go to provincia list
            res.redirect('/provincia')
          })
    });
};
// Display Provincia update form on GET
exports.provincia_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Provincia update GET');
};

// Handle Provincia update on POST
exports.provincia_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Provincia update POST');
};
