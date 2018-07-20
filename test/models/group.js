module.exports = function (sequelize, Sequelize) {
  const group = sequelize.define('Group', {
    gnum: { field: 'gnum', type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    groupname: { field: 'groupname', type: Sequelize.STRING(45), unique: false, allowNull: false },
    user_unum: { field: 'unum', type: Sequelize.INTEGER, unique: false, allowNull: false},
  }, {
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'group'
  });

  return group;
};
