const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/' , controller.getListVideo);

router.post('/' , controller.addVideo);

router.delete('/:id' , controller.deleteVideo);

module.exports = router;