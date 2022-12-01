var express = require('express');
var router = express.Router();
var ctrlMekanlar = require('../controllers/mekanlar');
var ctrtDigerleri = require('../controllers/digerleri');



router.get('/', ctrlMekanlar.anaSayfa);
router.get('/mekan/:mekanid', ctrlMekanlar.mekanBilgisi);
router.get('/mekan/yorum/yeni', ctrlMekanlar.yorumEkle);
router.get('/hakkinda', ctrtDigerleri.hakkinda);

module.exports = router;
