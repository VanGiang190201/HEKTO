const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/' , controller.getListCart);

//Add new cart product
router.post('/add-new', controller.addCart);

//Update change quantity

router.post('/:id', controller.updateCart);

//DELETE CART

router.delete('/:id' , controller.deleteCart);

module.exports = router;