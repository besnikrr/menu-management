const db = require("../models");
const Menu = db.menu;
const Item = db.item;

// Create and Save new Menu
exports.create = (req, res) => {
    console.log(req)
    Menu.create({
        name: req.body.name,
        description: req.body.description
    })
        .then(menu => {
            console.log(">> Created Menu: " + JSON.stringify(menu, null, 2));
            res.send(menu);
        })
        .catch((err) => {
            console.log(">> Error while creating Menu: ", err);
        });
};
// Find all Menus
exports.findAll = (req, res) => {
    return Menu.findAll({
        include: [
            {
                model: Item,
                as: "items",
                attributes: ["id", "name", "price", "description"],
                through: {
                    attributes: [],
                }
            },
        ],
    })
        .then((menus) => {
            return res.send(menus);
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
    console.log(id);
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
exports.addItem = (req, res) => {
    Menu.findByPk(req.body.menuId)
        .then((menu) => {
            if (!menu) {
                console.log("Menu not found!");
                return null;
            }
            Item.findByPk(req.body.itemId).then((item) => {
                if (!item) {
                    console.log("Item not found!");
                    return null;
                }

                menu.addItem(item);
                console.log(`>> added Item id=${item.id} to Menu id=${menu.id}`);
                res.send(menu);
            });
        })
        .catch((err) => {
            console.log(req)
            console.log(">> Error while adding Item to Menu: ", err);
        });
};

exports.removeItem = (req, res) => {
    Menu.findByPk(req.body.menuId)
        .then(menu => {
            Item.findByPk(req.body.itemId).then((item) => {
                if (!item) {
                    console.log("Item not found!");
                    return null;
                }

                menu.removeItem(1);
                console.log(`>> removed Item id=${item.id} to Menu id=${menu.id}`);
                res.send(menu);
            });
        })
        .catch((err) => {
            console.error(console.error(err.stack || err))
            console.log(">> Error while removing Item to Menu: ", err);
        })
}
