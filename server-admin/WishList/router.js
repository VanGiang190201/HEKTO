const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/' , controller.getWishList);

router.post('/' , controller.updateWishList);

module.exports = router;