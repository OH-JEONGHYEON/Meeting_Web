module.exports = function(passport) {

  var express = require('express');
  var route = express.Router();
  // var multer = require('multer');
  //
  // var upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5*1024*1024 } });

  route.get('/', (req,res) => {
    res.render('register', { message: req.flash('resError') })
  })

  // route.post('/register', upload.single('image'), passport.authenticate('signup', {
  route.post('/', passport.authenticate('register', {
      successRedirect : '/dashboard',
      failureRedirect : '/register', //가입 실패시 redirect할 url주소
      failureFlash : true
  }))

  route.post('/android',
    passport.authenticate('register'),
    function(req, res){
      if(req.user){
        res.json(req.user)
      } else {
        res.write('fail');
      }
    });


  return route;
};
