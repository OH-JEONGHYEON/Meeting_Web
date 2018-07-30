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
    
    timestamps: false,

    // 테이블 이름 그대로
    // 그 몽고디비처럼 복수로 저장되고 그런거 아님
    freezeTableName: true,

    // define the table's name
    tableName: 'user'
  });

  return user;
};
