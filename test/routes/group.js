module.exports = function(models) {

  var express = require('express');
  var route = express.Router();

  route.get('/add', async (req,res) => {
    await models.Group.bulkCreate([
      {
        gnum: "1",
        groupname: "웹",
        unum: "2"
      },
      {
        gnum: "1",
        groupname: "웹",
        unum: "3"
      },
      {
        gnum: "1",
        groupname: "웹",
        unum: "4"
      },
    ])
      .then(user => {
        return res.send('add ok!');
      })
      .catch(err => {
        return res.send(err);
      });
  });

  // 자신이 속한 그룹 보여주는 것.
  // route.get('/find', async (req,res) => {
  //   var result = await models.Group.findAll({
  //     attributes: ['groupname'],
  //     include: [{
  //       model: models.User,
  //       attributes: ['username'],
  //     }],
  //     where: {gnum: req.user.unum}
  //   });
  //   res.send(result);
  // });

  // 자신이 속한 그룹 보여주는 것.
  route.get('/find/query', async (req,res) => {
    var comm = `SELECT G.groupname, U.username, U.username \
    FROM commit.group AS G JOIN commit.user AS U\
    ON G.unum = U.unum \
    WHERE G.gnum=${req.user.unum};`;
    results = await models.sequelize.query(comm, { type: models.sequelize.QueryTypes.SELECT })
    if(results) { res.json(results) }
    });

  return route;
};
