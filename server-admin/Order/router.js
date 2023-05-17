const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/' , controller.getAllOrder);

router.get('/:id' , controller.getDetail);

router.get('/:id/products-order' , controller.getProductsOrder);

router.patch('/:id/update-status' , controller.changeStatusOrder);

router.post('/:id/save-bill' , controller.saveBill);

router.post('/:id/cancel-bill' , controller.cancelBill);







module.exports = router;