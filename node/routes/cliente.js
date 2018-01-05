var express = require('express');
var router = express.Router();

// Require controller modules
var cliente_controller = require('../controllers/clienteController');

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/create', cliente_controller.cliente_create_get);

/* POST request for creating Book. */
router.post('/create', cliente_controller.cliente_create_post);

/* GET request to delete Book. */
router.get('/:id/delete', cliente_controller.cliente_delete_get);

// POST request to delete Book
router.post('/:id/delete', cliente_controller.cliente_delete_post);

/* GET request to update Book. */
router.get('/:id/update', cliente_controller.cliente_update_get);

// POST request to update Book
router.post('/:id/update', cliente_controller.cliente_update_post);

/* GET request for one Book. */
router.get('/:id', cliente_controller.cliente_detail);

/* GET request for list of all Book items. */
router.get('/', cliente_controller.cliente_list);

module.exports = router;
