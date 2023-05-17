const {Router} = require('express');
const controller = require('./controller');
const multer = require('multer');
const path = require('path')


const DIR = './public/';
//Set up multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});


const router = Router();

router.get('/' , controller.getAllCarousel);
router.get('/:id' , controller.getDetailCarousel);
router.delete('/:id' , controller.deleteCarousel);
router.post('/:id/active' , controller.changeActiveCarousel);
router.post('/', upload.single('image_carousel'), controller.addSlider);
router.patch('/:id', upload.single('image_carousel'), controller.updateSlider);


module.exports = router;