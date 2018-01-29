var express = require('express');
var router = express.Router();

// Require controller modules
var direccion_controller = require('../controllers/direccionController');

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/create', direccion_controller.direccion_create_get);

/* POST request for creating Book. */
router.post('/create', direccion_controller.direccion_create_post);

/* GET request to delete Book. */
router.get('/:id/delete', direccion_controller.direccion_delete_get);

// POST request to delete Book
router.post('/:id/delete', direccion_controller.direccion_delete_post);

/* GET request to update Book. */
router.get('/:id/update', direccion_controller.direccion_update_get);

// POST request to update Book
router.post('/:id/update', direccion_controller.direccion_update_post);

/* GET request for one Book. */
router.get('/:id', direccion_controller.direccion_detail);

/* GET request for list of all Book items. */
router.get('/', direccion_controller.direccion_list);

module.exports = router;
