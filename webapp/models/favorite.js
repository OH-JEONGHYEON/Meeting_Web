module.exports = function (sequelize, DataTypes) {
  const favorite = sequelize.define('Favorite', {
    unum: { field: 'unum', type: DataTypes.INTEGER, primaryKey: true },
    fnum: { field: 'fnum', type: DataTypes.INTEGER, primaryKey: true },
  }, {

    timestamps: false,

    // 테이블 이름 그대로
    // 그 몽고디비처럼 복수로 저장되고 그런거 아님
    freezeTableName: true,

    // 테이블 이름 이거
    tableName: 'favorite'
  });

  return favorite;
};
