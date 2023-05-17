const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/' , controller.getListPortfolios);

router.get('/:id' , controller.getPortfolio);

router.post('/' , controller.addPortfolio);

router.patch('/:id' , controller.updatePortfolio);

router.delete('/:id' , controller.deletePortfolio);

module.exports = router;