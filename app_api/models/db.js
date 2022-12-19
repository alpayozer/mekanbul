var mongoose = require('mongoose');
//var dbURI = 'mongodb://localhost/mekanbul';
var dbURI = "mongodb+srv://alpay:1234@mekanbul.o2z26f1.mongodb.net/mekanbul?retryWrites=true&w=majority";
require("./mekansema"); //db.js dosyası mekansema içindeki her şeyi kullanabilmesi için tanıttık
require("./kullanicilar");


function kapat(msg,callback){
    mongoose.connection.close(function(){
        console.log(msg);
        callback();
    });
}

process.on("SIGINT",function(){
    kapat("Uygulama kapatıldı!",function(){
        process.exit(0);
    })
})


mongoose.connect(dbURI);
mongoose.connection.on(
    'connected', function(){
        console.log(dbURI + " adresindeki veritabanına bağlanıldı!\n");
    });
    
mongoose.connection.on(
    'error', function(){
        console.log(dbURI + "Bağlantı hatası!\n");
    });
    
mongoose.connection.on(
    'disconnected', function(){
        console.log(dbURI + "Bağlantı koptu!\n");
    });
    
