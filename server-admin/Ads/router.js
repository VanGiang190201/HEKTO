const { Router } = require("express");
const controller = require("./controller");

const multer = require("multer");
const path = require("path");

const DIR = "./public/";
//Set up multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// const multi_upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//       if (
//         file.mimetype == 'image/png' ||
//         file.mimetype == 'image/jpeg' ||
//         file.mimetype == 'image/jpg'
//       ) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         const err = new Error('Only .jpg .jpeg .png images are supported!');
//         err.name = 'ExtensionError';
//         return cb(err);
//       }
//     },
//   }).array('uploadImages', 10);

const router = Router();

router.get("/", controller.getListAd);
router.get("/:id", controller.getAd);
router.get("/is-used", controller.getAdIsUsed);
router.post("/:id/active", controller.changeActive);

router.delete("/:id", controller.deleteAd);

router.post(
  "/",
  upload.fields([
    {
      name: "image_first",
      maxCount: 1,
    },
    {
      name: "image_second",
      maxCount: 1,
    },
  ]),
  controller.addAd
);

router.post(
  "/:id",
  upload.fields([
    {
      name: "image_first",
      maxCount: 2,
    },
    {
      name: "image_second",
      maxCount: 2,
    },
  ]),
  controller.updateAd
);

module.exports = router;
