const db = require("../models");
const Menu = db.menu;
const Item = db.item;

// Create and Save new Item
exports.create = (req, res) => {
    Item.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    })
        .then((item) => {
            console.log(">> Created Item: " + JSON.stringify(item, null, 4));
            res.send(item);
        })
        .catch((err) => {
            console.log(">> Error while creating Item: ", err);
        });
};
// Retrieve all Items
exports.findAll = (req, res) => {
    return Item.findAll({
        include: [
            {
                model: Menu,
                as: "menus",
                attributes: ["id", "name", "description"],
                through: {
                    attributes: [],
                },
                // through: {
                //   attributes: ["menu_id", "item_id"],
                // },
            },
        ],
    })
        .then((items) => {
            return res.send(items);
        })
        .catch((err) => {
            console.log(">> Error while retrieving Items: ", err);
        });
};
//Get the Item for a given item id
exports.findById = (id) => {
    return Item.findByPk(id, {
        include: [
            {
                model: Item,
                as: "items",
                attributes: ["id", "name", "price", "description"],
                through: {
                    attributes: [],
                },
                // through: {
                //   attributes: ["menu_id", "item_id"],
                // },
            },
        ],
    })
        .then((item) => {
            return item;
        })
        .catch((err) => {
            console.log(">> Error while finding Item: ", err);
        });
};
// Update item
exports.update = (req, res) => {
    const id = req.params.id;

    Item.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            });
        });
};
// remove a item
exports.delete = (req, res) => {
    const id = req.params.id;

    Item.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
};
// remove all items
exports.deleteAll = (req, res) => {
    Item.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Items were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all items."
            });
        });
};
