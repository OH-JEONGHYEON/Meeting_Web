module.exports = function(models) {

  var express = require('express');
  var route = express.Router();


  // 즐겨찾는 계정 및 그룹 추가 페이지
  route.get('/', (req,res) => {
    res.render('addSample');
  });

  // 즐겨찾는 계정 목록
  route.get('/favorite', async (req,res) => {
    try {
      var comm = `SELECT U.unum, U.uid, U.uname, U.company, U.department, U.position \
      FROM commit.favorite JOIN commit.user AS U ON favorite.fnum = U.unum \
      WHERE favorite.unum=${req.user.unum};`;
      var results = await models.sequelize.query(comm, { type: models.sequelize.QueryTypes.SELECT });
      if(results) { res.send(results); }
    } catch(err){
      req.flash('findError', '친구목록을 불러오는데 실패했습니다.');
      return res.send({message: req.flash('findError')});
    }
  });

  // 아이디로 친구 검색
  route.post('/search', async (req,res) => {
    try {
      var user = await models.User.findOne({
        where: { uid: req.body.uid },
        attributes: ['unum','uname', 'company', 'department', 'position'],
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

  // 즐겨찾는 계정 추가
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

  // 그룹 목록
  route.get('/group', async (req,res) => {
    var results = await models.Group.findAll({
      attributes: ['gname'],
      include: [{
        model: models.User,
        attributes: ['uname', 'company', 'department', 'position'],
      }],
      where: {unum: req.user.unum}
    });
    if(results) {
      data = {}
      for(var i=0;i<results.length;i++){
        if(!(results[i].gname in data)){
          data[results[i].gname] = new Array(results[i].User);
        } else {
          data[results[i].gname].push(results[i].User);
        }
      }
      res.send(data);
    }
  });

  // 그룹 추가
  // 그룹 계정 어케 보내줄건지.... 가 솔직히 중요하진 않은가...
  // 나는 생각이 없다...
  // route.post('/group', async (req,res) => {
  //   try {
  //     for(var i=0;i<req.body.)
  //     var result = await models.Group.create(
  //       {
  //         gnum: req.user.unum,
  //         groupname: req.body.groupname,
  //         unum: ,
  //       });
  //     res.send(null);
  //   } catch(err) {
  //     req.flash('addError', '이미 추가된 계정입니다.');
  //     res.send({message: req.flash('addError')});
  //   }
  // });

  // 그룹 삭제
  route.delete('/group', async (req,res) => {
    console.log(req.query.gname);
    try {
      await models.Group.findAll(
        {
          where: {
            unum: req.user.unum,
            gname: req.query.gname
          }
        })
        .then(fav => {
          console.log(fav);
          for(var f in fav){
            f.destroy();
          }
        })
      return res.send(null);
    } catch(err) {
      console.log(err);
      req.flash('delError', '삭제 문제 발생 영원한 그룹 오오오');
      return res.send({message: req.flash('delError')});
    }
  });

  return route;
};