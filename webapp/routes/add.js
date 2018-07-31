module.exports = function(models) {

  var express = require('express');
  var route = express.Router();


  route.get('/', (req,res) => {
    res.render('add_friends');
  });

  route.get('/favorite', async (req,res) => {
    try {
      var comm = `SELECT U.unum, U.userid, U.username, U.comname, U.department, U.position \
      FROM commit.favorite JOIN commit.user AS U ON favorite.fnum = U.unum;`;
      var results = await models.sequelize.query(comm, { type: models.sequelize.QueryTypes.SELECT });
      if(results) { res.send(results); }
    } catch(err){
      req.flash('findError', '친구목록을 불러오는데 실패했습니다.');
      return res.send({message: req.flash('findError')});
    }
  });

  route.post('/search', async (req,res) => {
    try {
      var user = await models.User.findOne({
        where: { userid: req.body.uid },
        attributes: ['unum','username', 'comname', 'department', 'position'],
        raw: true
      });
      if(user) {
        console.log(user);
        return res.send(user);
      } else {
        console.log(user);
        req.flash('searchError', '일치하는 계정이 없습니다. 정확한 아이디를 입력해주세요.');
        return res.send({message: req.flash('searchError')});
      }
    } catch(err) {
      console.log(err);
      req.flash('searchError', '예기치 못한 에러가 발생했습니당ㅎㅎ');
      return res.send({message: req.flash('searchError')});
    }
  });

  // 이 추가 작업할 때는 저한테 말씀해주세요
  route.post('/favorite', async (req,res) => {
    if(req.user.unum === req.body.fnum){
      req.flash('addError', '나 자신은 영원한 친구입니다. -카톡-');
      return res.send({message: req.flash('addError')});
    }
    try {
      var result = await models.Favorite.create(
        {
          unum: req.user.unum,
          fnum: req.body.fnum
        });
      res.send(null);
    } catch(err) {
      req.flash('addError', '이미 추가된 계정입니다.');
      res.send({message: req.flash('addError')});
    }
  });

  // 즐겨찾는 계정 정보 탐색
  // json의 리스트 형식으로 반환
  route.delete('/favorite', async (req,res) => {
    console.log(req.query.fnum);
    try {
      var result = await models.Favorite.findOne(
        {
          where: {
            unum: req.user.unum,
            fnum: req.query.fnum
          }
        })
        .then(fav => {
          return fav.destroy();
        })
      console.log(result);
      return res.send(null);
    } catch(err) {
      console.log(err);
      req.flash('delError', '삭제 문제 발생 영원한 친구 오오오');
      return res.send({message: req.flash('delError')});
    }
  });

  return route;
};
