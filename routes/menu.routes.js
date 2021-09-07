const menu = require("../controller/menu.controller.js");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Menu
    app.post("/api/menu", menu.create);

    // Retrieve all Menus
    app.get("/api/menu", menu.findAll);

    // Update a Menu with id
    app.put("/api/menu/:id", menu.update);

    // Delete a Menu with id
    app.delete("/api/menu/:id", menu.delete);

    // Create a new Menu
    app.delete("/api/menu", menu.deleteAll);

    // Add Item to Menu
    app.post("/api/menu/item", menu.addItem);

    // Remove Item from Menu
    app.delete("/api/menu-delete-item", menu.removeItem);
};
