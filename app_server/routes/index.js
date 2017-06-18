var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlMedia = require('../controllers/media');
var ctrlBios = require('../controllers/bios');
var ctrlLinks = require('../controllers/links');

/*GET home page */
router.get('/', ctrlMain.mainPage);
/*Media page */
router.get('/media', ctrlMedia.media);
/*Bios page*/
router.get('/bios', ctrlBios.bios);
/*Links pages*/
router.get('/download', ctrlLinks.downloadPage);
router.get('/comments', ctrlLinks.commentsPage);
router.get('/about', ctrlLinks.aboutPage);

module.exports = router;