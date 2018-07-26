module.exports = function(models) {

  var express = require('express');
  var route = express.Router();

  // 임시로 추가하는 라우터. 신경안써도 됨.
  // route.get('/add', async (req,res) => {
  //   await models.Favorite.bulkCreate([
  //     {
  //       unum: 1,
  //       fnum: 2
  //     },
  //     {
  //       unum: 1,
  //       fnum: 3
  //     },
  //     {
  //       unum: 1,
  //       fnum: 4
  //     },
  //   ])
  //     .then(user => {
  //       return res.send('add ok!');
  //     })
  //     .catch(err => {
  //       return res.send(err);
  //     });
  // });

  // 이 추가 작업할 때는 저한테 말씀해주세요
  route.post('/add', async (req,res) => {
    try {
      var result = await models.Favorite.create(
        {
          unum: req.body.unum,
          fnum: req.body.fnum
        });
    } catch(err) {
      req.flash('addError', '즐겨찾는 계정을 추가하는데 문제가 발생했습니다. 다시 시도해주세요.');
      res.send({message: req.flash('addError')});
    }
  });

  // 즐겨찾는 계정 정보 탐색
  // json의 리스트 형식으로 반환
  route.get('/find', async (req,res) => {
    var comm = `SELECT U.userid, U.username, U.comname, U.department, U.position \
    FROM commit.favorite JOIN commit.user AS U ON favorite.fnum = U.unum;`;
    var results = await models.sequelize.query(comm, { type: models.sequelize.QueryTypes.SELECT });
    if(results) { res.json(results); }
  });

  return route;
};
