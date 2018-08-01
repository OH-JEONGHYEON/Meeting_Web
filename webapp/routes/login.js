module.exports = function(passport) {

  var express = require('express');
  var route = express.Router();

  route.get('/', (req,res) => {
    res.render('login');
  })
  route.post('/', passport.authenticate('login', {
      successRedirect : '/dashboard',
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

  return route;
};
