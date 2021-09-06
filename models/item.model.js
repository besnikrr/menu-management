module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10, 2)
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Item;
};
