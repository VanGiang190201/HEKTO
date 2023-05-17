const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/' , controller.getListCustomer);

router.get('/:id' , controller.getUser);


module.exports = router;