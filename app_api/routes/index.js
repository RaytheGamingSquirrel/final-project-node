var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlBios = require('../controllers/bios');
var ctrlMedia = require('../controllers/media');

//Main
router.get('/main', ctrlMain.mainListByTitle);
router.post('/main', ctrlMain.mainCreate);
router.get('/main/:mainid', ctrlMain.mainReadOne);
router.put('/main/:mainid', ctrlMain.mainUpdateOne);
router.delete('/main/:mainid', ctrlMain.mainDeleteOne);

//Media
router.get('/media', ctrlMedia.mediaListByTitle);
router.post('/media', ctrlMedia.mediaCreate);
router.get('/media/:mediaid', ctrlMedia.mediaReadOne);
router.put('/media/:mediaid', ctrlMedia.mediaUpdateOne);
router.delete('/media/:mediaid', ctrlMedia.mediaDeleteOne);

//Bios
router.get('/bios', ctrlBios.biosListByTitle);
router.post('/bios', ctrlBios.biosCreate);
router.get('/bios/:biosid', ctrlBios.biosReadOne);
router.put('/bios/:biosid', ctrlBios.biosUpdateOne);
router.delete('/bios/:biosid', ctrlBios.biosDeleteOne);

module.exports = router;