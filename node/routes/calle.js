var express = require('express');
var router = express.Router();

// Require controller modules
var calle_controller = require('../controllers/calleController');

/* GET request for creating a Book. NOTE This must come before routes that display Book (uses id) */
router.get('/create', calle_controller.calle_create_get);

/* POST request for creating Book. */
router.post('/create', calle_controller.calle_create_post);

/* GET request to delete Book. */
router.get('/:id/delete', calle_controller.calle_delete_get);

// POST request to delete Book
router.post('/:id/delete', calle_controller.calle_delete_post);

/* GET request to update Book. */
router.get('/:id/update', calle_controller.calle_update_get);

// POST request to update Book
router.post('/:id/update', calle_controller.calle_update_post);

/* GET request for one Book. */
router.get('/:id', calle_controller.calle_detail);

/* GET request for list of all Book items. */
router.get('/', calle_controller.calle_list);

module.exports = router;
