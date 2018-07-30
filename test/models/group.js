module.exports = function (sequelize, Sequelize) {
  const group = sequelize.define('Group', {
    gnum: { field: 'gnum', type: Sequelize.INTEGER, unique: false, allowNull: false },
    groupname: { field: 'groupname', type: Sequelize.STRING(45), unique: false, allowNull: false },
    UserUnum: { field: 'unum', type: Sequelize.INTEGER, unique: false, allowNull: false},
  }, {

    timestamps: false,

    // 테이블 이름 그대로
    // 그 몽고디비처럼 복수로 저장되고 그런거 아님
    freezeTableName: true,

    // define the table's name
    tableName: 'group'
  });

  return group;
};
