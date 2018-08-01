var express = require('express');
var route = express.Router();

route.get('/', (req,res) => {
  if(req.user) {
    console.log(req.user);
    res.render('dashboard', {info: req.user});
  } else {
    res.redirect('/login');
  }
});

module.exports = route;
