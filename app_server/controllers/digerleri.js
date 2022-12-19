const hakkinda = function(req,res,next){
    res.render('hakkinda', {title: 'Hakkında Sayfası'});
}

const adminSayfasi = function(req,res,next){
    res.render('admin', {title: 'Admin Sayfası'});
}

const adminDetaySayfasi = function(req,res,next){
    res.render('adminpanel', {title: 'Admin Panel Sayfası'});
}

module.exports={
    hakkinda,
    adminSayfasi,
    adminDetaySayfasi
}
