const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.menu = require("./menu.model.js")(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);

db.item.belongsToMany(db.menu, {
    through: "menu_item",
    as: "menus",
    foreignKey: "menu_id"
})

db.menu.belongsToMany(db.item, {
    through: "menu_item",
    as: "items",
    foreignKey: "item_id"
})

module.exports = db;
