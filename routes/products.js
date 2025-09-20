const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.index);
router.get('/form/:id?', auth, controller.form);
router.post('/create', auth, controller.create);
router.get('/delete/:id', auth, controller.delete);

module.exports = router;
