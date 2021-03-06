const express = require('express');
const router = express.Router();

const controller = require('../controllers/book.controller');

var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

router.get("/", controller.index);

router.post("/create", upload.single('cover'), controller.create);

router.get("/:id/remove", controller.remove);

router.get("/:id/edit", controller.edit);

router.post("/:id/update", upload.single('cover'), controller.update);

router.get("/search", controller.search);

module.exports = router