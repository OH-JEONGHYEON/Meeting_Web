module.exports = function(passport) {

  var express = require('express');
  var route = express.Router();
  // var multer = require('multer');
  //
  // var upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5*1024*1024 } });

  // 웹 로그인 페이지
  route.get('/', (req,res) => {
    res.render('login');
  })

  // 웹 로그인 요청
  route.post('/', passport.authenticate('login', {
      successRedirect : '/index',
      failureRedirect : '/login', //로그인 실패시 redirect할 url주소
      failureFlash : true
  }));

  // 안드로이드 로그인 요청
  route.post('/android', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      if (err) {
        // 서버 오류
        return res.status(500).send(null);
      }
      if (!user) { // 로그인 실패
        req.flash('logError', '일치하는 계정 없음');
        return res.send(200, {message : req.flash('logError') });
      }
      return res.send(200, {success: "성공"});
    })(req, res, next);
  });

  // 웹 회원가입 페이지
  route.get('/signup', (req,res) => {
    res.render('register', { message: req.flash('resError') })
  })

  // 웹 회원가입 요청
  // route.post('/signup', upload.single('image'), passport.authenticate('signup', {
  route.post('/signup', passport.authenticate('signup', {
      successRedirect : '/index',
      failureRedirect : '/signup', //가입 실패시 redirect할 url주소
      failureFlash : true
  }))

  // 안드로이드 회원가입 요청
  route.post('/signup/android', function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
      if (err) {
        // 서버 오류
        return res.status(500).send(null);
      }
      if (!user) { //회원가입 실패
        req.flash('resError', '중복된 아이디가 존재합니다.');
        return res.send(200, { message : req.flash('resError') });
      }
      return res.send(200, req.user);
    })(req, res, next);
  });

  return route;
};
