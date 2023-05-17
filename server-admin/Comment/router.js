const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/' , controller.getComments);

router.delete('/:id' , controller.deleteComment);



module.exports = router;