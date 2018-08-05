module.exports = function(models) {

  var express = require('express');
  var route = express.Router();

  //회의 시작&예약하기
  route.get('/make', (req,res) => {
    res.render('makeMeet', {
      info: req.user, 
      title: 'MakeMeet'
    });
  });

  //회의 예약리스트
  route.get('/book', (req,res) => {
    res.render('bookMeet', {
      info: req.user, 
      title: 'BookMeet'
    });
  });

  //회의 중
  route.get('/meeting', (req,res) => {
    res.render('meeting', {
      info: req.user, 
      title: 'Meeting'
    });
  });


  return route;
};
