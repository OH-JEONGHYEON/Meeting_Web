module.exports = function (sequelize, Sequelize) {
  const user = sequelize.define('User', {
    unum: { field: 'unum', type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userid: { field: 'userid', type: Sequelize.STRING(45), unique: true, allowNull: false },
    pw: { field: 'pw', type: Sequelize.STRING(225), allowNull: false },
    username: {field: 'username', type: Sequelize.STRING(45), allowNull: false },
    comname: {field: 'comname', type: Sequelize.STRING(255), allowNull: false },
    department: {field: 'department', type: Sequelize.STRING(125), allowNull: false },
    position: {field: 'position', type: Sequelize.STRING(45), allowNull: false },
    userimage: {field: 'userimage', type: Sequelize.BLOB, allowNull: true },
  }, {
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'user'
  });

  return user;
};
