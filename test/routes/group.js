module.exports = function(models) {

  var express = require('express');
  var route = express.Router();

  route.get('/add', async (req,res) => {
    await models.Group.bulkCreate([
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

  route.get('/find', async (req,res) => {
    await models.Group.findAll({
      attributes: ['groupname'],
      include: {
        model: models.User,
        attributes: ['username', 'userid']
      },
      raw: true,
    }).then(data => {
      res.json(data);
    }).catch(err => {
      res.send(err);
    });
  });

  route.get('/find/query', async (req,res) => {
    var comm = "SELECT * FROM commit.group JOIN commit.user ON group.unum = user.unum;";
    await models.sequelize.query(comm, { type: models.sequelize.QueryTypes.SELECT })
      .then(results => {
        res.json(results);
      })
      .catch(err => {
        res.send(err);
      })
    });

  return route;
};
