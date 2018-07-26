module.exports = function(passport) {

  var express = require('express');
  var route = express.Router();
  // var multer = require('multer');
  //
  // var upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5*1024*1024 } });

  route.get('/', (req,res) => {
    res.render('login');
  })
  route.post('/', passport.authenticate('login', {
      successRedirect : '/index',
      failureRedirect : '/login', //로그인 실패시 redirect할 url주소
      failureFlash : true
  }));

  route.post('/android',
    passport.authenticate('login'),
    function(req, res){
      if(req.user){
        res.json(req.user)
      } else {
        res.write('fail');
      }
    });

  route.get('/signup', (req,res) => {
    res.render('register', { message: req.flash('resError') })
  })

  // route.post('/signup', upload.single('image'), passport.authenticate('signup', {
  route.post('/signup', passport.authenticate('signup', {
      successRedirect : '/index',
      failureRedirect : '/signup', //가입 실패시 redirect할 url주소
      failureFlash : true
  }))

  route.post('/signup/android',
    passport.authenticate('signup'),
    function(req, res){
      if(req.user){
        res.json(req.user)
      } else {
        res.write('fail');
      }
    });


  return route;
};
