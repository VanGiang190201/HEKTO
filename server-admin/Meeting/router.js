const {Router} = require('express');
const controller = require('./controller');

const router = Router();


router.get('/' , controller.bookings);

router.get('/:id' , controller.booking);

router.post('/:id' , controller.confirmMeeting);

router.get('/:id/products' , controller.productMeeting);

module.exports = router;