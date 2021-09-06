const db = require("../models");
const Menu = db.menu;
const Item = db.item;

// Create and Save new Menu
exports.create = (menu, userId) => {
    return Menu.create({
        name: menu.name,
        description: menu.description,
        userId: userId
    })
        .then((menu) => {
            console.log(">> Created Menu: " + JSON.stringify(menu, null, 2));
            return menu;
        })
        .catch((err) => {
            console.log(">> Error while creating Menu: ", err);
        });
};
// Find all Menus
exports.findAll = () => {
    return Menu.findAll({
        include: [
            {
                model: Item,
                as: "items",
                attributes: ["id", "name", "price","description"],
                through: {
                    attributes: [],
                }
            },
        ],
    })
        .then((menus) => {
            return menus;
        })
        .catch((err) => {
            console.log(">> Error while retrieving Menus: ", err);
        });
};
// Update menu
exports.update = (req, res) => {
    const id = req.params.id;

        Menu.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Menu was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Menu with id=${id}. Maybe Menu was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Menu with id=" + id
            });
        });
};
// remove a Menu
exports.delete = (req, res) => {
    const id = req.params.id;

    Menu.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Menu was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Menu with id=" + id
            });
        });
};
// remove all
exports.deleteAll = (req, res) => {
    Menu.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Menus were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all menus."
            });
        });
};
//Add a Item to a Menu
exports.addItem = (menuId, itemId) => {
    return Menu.findByPk(menuId)
        .then((menu) => {
            if (!menu) {
                console.log("Menu not found!");
                return null;
            }
            return Item.findByPk(itemId).then((item) => {
                if (!item) {
                    console.log("Item not found!");
                    return null;
                }

                menu.addItem(item);
                console.log(`>> added Item id=${item.id} to Menu id=${menu.id}`);
                return menu;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Item to Menu: ", err);
        });
};

// removeItem
// exports.removeItem = (req, res) => {
//     const id = req.params.id
//     Item.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Item was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Item with id=" + id
//             });
//         });
// }

