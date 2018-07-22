module.exports = function(models) {

  var express = require('express');
  var route = express.Router();

  route.get('/add', async (req,res) => {
    await models.favorite.bulkCreate([
      {
        groupname: "웹",
        unum: "1"
      },
      {
        groupname: "웹",
        unum: "2"
      },
      {
        groupname: "웹",
        unum: "3"
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
  route.get('/find/query', async (req,res) => {
    var comm = "SELECT * FROM commit.group JOIN commit.user ON group.unum = user.unum;";
    results = await models.sequelize.query(comm, { type: models.sequelize.QueryTypes.SELECT })
    if(results) { res.json(results) }
    });

  return route;
};
