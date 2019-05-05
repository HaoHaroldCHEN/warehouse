var express = require('express');
var router = express.Router();

const genre_controller = require('../controllers/genreController');

/* GET home page. */
router.get('/', genre_controller.index);
router.get('/cate_list', genre_controller.cateList);
router.get('/cart_query', genre_controller.cartQuery);

module.exports = router;
