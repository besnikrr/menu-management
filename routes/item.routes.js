const item = require("../controller/item.controller.js");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Menu
    app.post("/api/item", item.create);

    // Retrieve all Menus
    app.get("/api/item", item.findAll);

    // Update a Menu with id
    app.put("/api/item/:id", item.update);

    // Delete a Menu with id
    app.delete("/api/item/:id", item.delete);

    // Create a new Menu
    app.delete("/api/item", item.deleteAll);
};
