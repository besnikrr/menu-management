module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Menu;
};
