var express = require('express');
var router = express.Router();

const anaSayfa = function(req,res,next){
    res.render('anasayfa', {
        "baslik": "Anasayfa",
        "sayfaBaslik": {
            "siteAd": "MekanBul",
            "slogan": "Civardaki Mekanları Keşfet"
        },
        "mekanlar": [
            {
                "ad": "Starbucks",
                "adres": "Centrum Garden AVM",
                "puan": "4",
                "imkanlar": ["Kahve", "Pasta", "Kek"],
                "mesafe": "10km"
            },
            {
                "ad": "Gloria Jeans",
                "adres": "SDÜ Doğu Kampüsü",
                "puan": "2",
                "imkanlar": ["Kahve", "Çay", "Kek"],
                "mesafe": "1km"
            }
        ]   
    }
    );
}

const mekanBilgisi = function(req,res,next){
    res.render('mekanbilgisi',
    {
        "baslik": "Mekan Bilgisi",
        "mekanBaslik": "Starbucks",
        "mekanDetay":{
            "ad":"Starbucks",
            "adres":"Centrum Garden AVM",
            "puan":"4",
            "imkanlar":["Kahve","Pasta","Kek"],
            "koordinatlar":{
                "enlem":"37.7",
                "boylam":"30.5"
            },
            "saatler": [
                {
                    "gunler": "Pazartesi-Cuma",
                    "acilis": "9:00",
                    "kapanis": "23:00",
                    "kapali": false
                },
                {
                    "gunler": "Cumartesi-Pazar",
                    "acilis": "10:00",
                    "kapanis": "22:00",
                    "kapali": false
                }
            ],
            "yorumlar":[
                {
                  "yorumYapan": "Alpay Özer",
                  "puan":"4",
                  "tarih":"20 Ekim 2022",
                  "yorumMetni": "Kahveler iyi."

                }
            ]
        }
    }
    );
}

const yorumEkle = function(req,res,next){
    res.render('yorumekle', {title: 'Yorum ekle'});
}
module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}