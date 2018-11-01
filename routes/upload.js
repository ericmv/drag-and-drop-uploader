const express = require('express');
const router = express.Router();
const multer  = require('multer');

const path = require('path');


const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage}).single('file');

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    let file = req.file;
    if (err) {
      res.render('index', {
        msg: err
      });
    } else {
      if (file == undefined) {
        res.render('index', {
          msg: 'No File Selected!'
        })
      } else {
        res.render('index', {
          msg: 'File Uploaded!'
        })
      }
    }
  })

});

module.exports = router;
