var Cliente = require('../models/cliente');

// Display list of all Clientes
exports.cliente_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente list');
};

// Display detail page for a specific Cliente
exports.cliente_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente detail: ' + req.params.id);
};

// Display Cliente create form on GET
exports.cliente_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente create GET');
};

// Handle Cliente create on POST
exports.cliente_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente create POST');
};

// Display Cliente delete form on GET
exports.cliente_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente delete GET');
};

// Handle Cliente delete on POST
exports.cliente_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente delete POST');
};

// Display Cliente update form on GET
exports.cliente_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente update GET');
};

// Handle Cliente update on POST
exports.cliente_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Cliente update POST');
};
