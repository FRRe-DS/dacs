var express = require('express');
var router = express.Router();

// Require controller modules
var provincia_controller = require('../controllers/provinciaController');

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/create', provincia_controller.provincia_create_get);

/* POST request for creating Book. */
router.post('/create', provincia_controller.provincia_create_post);

/* GET request to delete Book. */
router.get('/:id/delete', provincia_controller.provincia_delete_get);

// POST request to delete Book
router.post('/:id/delete', provincia_controller.provincia_delete_post);

/* GET request to update Book. */
router.get('/:id/update', provincia_controller.provincia_update_get);

// POST request to update Book
router.post('/:id/update', provincia_controller.provincia_update_post);

/* GET request for one Book. */
router.get('/:id', provincia_controller.provincia_detail);

/* GET request for list of all Book items. */
router.get('/', provincia_controller.provincia_list);

module.exports = router;
