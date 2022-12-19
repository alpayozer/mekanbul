const hakkinda = function(req,res,next){
    res.render('hakkinda', {title: 'Hakkında Sayfası'});
}

const adminSayfasi = function(req,res,next){
    res.render('admin', {title: 'Admin Sayfası'});
}



module.exports={
    hakkinda,
    adminSayfasi,
}
