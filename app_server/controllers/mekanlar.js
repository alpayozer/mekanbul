const axios = require("axios")
var mongoose = require('mongoose');
var Mekan=mongoose.model("mekan");

var apiSecenekleri = {
  sunucu: "https://mekanbul.alpayzer.repl.co",
  apiYolu: "/api/mekanlar/"
}

var mesafeyiFormatla = function (mesafe) {
  var yeniMesafe, birim
  if (mesafe > 1) {
    yeniMesafe = parseFloat(mesafe).toFixed(1)
    birim = " km"
  }
  else {
    yeniMesafe = parseInt(mesafe * 1000, 10)
    birim = " m"
  }
  return yeniMesafe + birim
}

const anaSayfaOlustur = function (res, mekanListesi) {
  var mesaj
  if (!(mekanListesi instanceof Array)) {
    mesaj = "API hatası!"
    mekanListesi = []
  }
  else {
    if (!mekanListesi.length) {
      mesaj = "Civarda herhangi bir mekan yok."
    }
  }
  res.render("anasayfa", {
    "baslik": "Anasayfa",
    "sayfaBaslik": {
      "siteAd": "Mekanbul",
      "slogan": "Mekanları Keşfet"
    },
    "mekanlar": mekanListesi,
    "mesaj": mesaj
  })
}

const anaSayfa = function (req, res, next) {
  axios.get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu, {
    params: {
      enlem: req.query.enlem,
      boylam: req.query.boylam
    }
  }).then(function (response) {
    var i, mekanlar
    mekanlar = response.data
    for (i = 0; i < mekanlar.length; i++) {
      mekanlar[i].mesafe = mesafeyiFormatla(mekanlar[i].mesafe)
    }
    anaSayfaOlustur(res, mekanlar)
  }).catch(function (hata) {
    anaSayfaOlustur(res, hata)
  })
}

const detaySayfasiOlustur = function (res, mekanDetaylari) {
  mekanDetaylari.koordinat = {
    "enlem": mekanDetaylari.koordinat[0],
    "boylam": mekanDetaylari.koordinat[1]
  }
  res.render('mekanbilgisi', {
    mekanBaslik: mekanDetaylari.ad,
    mekanDetay: mekanDetaylari
  })
}

const hataGoster = function (res, hata) {
  var mesaj
  if (hata.response.status == 404) {
    mesaj = "404, Sayfa Bulunamadı!"
  }
  else {
    mesaj = hata.response.status + " hatası"
  }
  res.status(hata.response.status)
  res.render('error', {
    "mesaj": mesaj
  })
}

const mekanBilgisi = function (req, res, next) {
  axios.get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid)
    .then(function (response) {
      req.session.mekanAdi = response.data.ad;
      detaySayfasiOlustur(res, response.data)
    })
    .catch(function (hata) {
      hataGoster(res, hata)
    })
}

const yorumEkle = function (req, res) {
  var mekanAdi = req.session.mekanAdi;
  var mekanid = req.params.mekanid;
  if(!mekanAdi){
    res.redirect("/mekan/"+mekanid);
  }else{
    res.render('yorumekle', {"baslik":mekanAdi+" mekanına yorum ekle", title: 'Yorum Ekle' });
  }
}

const yorumumuEkle = function (req, res) {
  var gonderilenYorum,mekanid;
  mekanid = req.params.mekanid;
  if(!req.body.adsoyad || !req.body.yorum){
    res.redirect("/mekan/"+mekanid+"/yorum/yeni?hata=evet");
  }else{
    gonderilenYorum={
      yorumYapan:req.body.adsoyad,
      puan:req.body.puan,
      yorumMetni:req.body.yorum
    }
    axios.post(apiSecenekleri.sunucu + apiSecenekleri.apiYolu + mekanid + "/yorumlar", gonderilenYorum).then(function(){
      res.redirect("/mekan/" + mekanid);
    });
  }
}

const girisYap = function (req, res) {
  var gonderilenKullanici;
  if(!req.body.eposta || !req.body.sifre){
    res.redirect("/admin"+"/adminPanel/giris?hata=evet");
  }else{
    gonderilenKullanici={
      eposta:req.body.eposta,
      sifre:req.body.sifre,
      token:req.auth.bearerToken
    }
    axios.post(apiSecenekleri.sunucu + "/api" + "/girisYap", gonderilenKullanici).then(function(){
      res.redirect("/admin/adminPanel");
    });
  }
}

const mekanimiEkle = function (req, res) {
  var eklenenMekan;
  
  //if(!req.body.adsoyad || !req.body.yorum){
  //  res.redirect("/mekan/"+mekanid+"/yorum/yeni?hata=evet");
  //}else{
    eklenenMekan=Mekan.create({
      ad: req.body.ad,
      adres: req.body.adres,
      imkanlar: req.body.imkanlar.split(","),
      koordinatlar: [parseFloat(req.body.enlem),parseFloat(req.body.boylam)],
      saatler: [{
          gunler: req.body.gunler1,
          acilis: req.body.acilis1,
          kapanis: req.body.kapanis1,
          kapali: req.body.kapali1
      },{
          gunler: req.body.gunler2,
          acilis: req.body.acilis2,
          kapanis: req.body.kapanis2,
          kapali: req.body.kapali2
      }]
  },function(hata,mekan){
      if(hata){
          cevapOlustur(res,400,hata);
      }else{
          cevapOlustur(res,201,mekan);
      }
  });
    axios.post(apiSecenekleri.sunucu + apiSecenekleri.apiYolu + mekanid + "/", eklenenMekan).then(function(){
      res.redirect("/mekan/" + mekanid);
    });
  }
//}

module.exports = {
  anaSayfa,
  mekanBilgisi,
  yorumEkle,
  yorumumuEkle,
  girisYap,
}