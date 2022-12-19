var express = require('express');
var router = express.Router();
var ctrlMekanlar = require('../controllers/mekanlar');
var ctrtDigerleri = require('../controllers/digerleri');



router.get('/', ctrlMekanlar.anaSayfa);
router.get('/mekan/:mekanid', ctrlMekanlar.mekanBilgisi);
router.get('/mekan/:mekanid/yorum/yeni', ctrlMekanlar.yorumEkle);
router.post('/mekan/:mekanid/yorum/yeni', ctrlMekanlar.yorumumuEkle);
router.get('/hakkinda', ctrtDigerleri.hakkinda);
router.get('/admin', ctrtDigerleri.adminSayfasi);
router.get('/panel', ctrlMekanlar.adminPanel);
//router.delete('/mekan/:mekanid', ctrlMekanlar.mekanSil);

module.exports = router;
