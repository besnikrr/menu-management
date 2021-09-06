const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const MenuController = require("./controller/menu.controller");
const ItemController = require("./controller/item.controller");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

const run = async() => {
    const menu1 = await MenuController.create({
        name: "Menu#1",
        description: "Menu#1 Description",
    });
    const menu2 = await MenuController.create({
        name: "Menu#2",
        description: "Menu#2 Description",
    });
    const menu3 = await MenuController.create({
        name: "Menu#3",
        description: "Menu#3 Description",
    });

    const item1 = await ItemController.create({
        name: "item#1",
        price: 22.22,
        description: "item#1 Description",
    });

    const item2 = await ItemController.create({
        name: "item#2",
        price: 22.21,
        description: "item#2 Description",
    });
};

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/menu.routes")(app);
require("./routes/item.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     run();
// });

// const menu1 = await MenuController.create({
//     name: "Menu#1",
//     description: "Menu#1 Description",
// });
// const menu2 = await MenuController.create({
//     name: "Menu#2",
//     description: "Menu#2 Description",
// });
// const menu3 = await MenuController.create({
//     name: "Menu#3",
//     description: "Menu#3 Description",
// });
//
// const item1 = await ItemController.create({
//     name: "item#1",
//     price: 22.22,
//     description: "item#1 Description",
// });
//
// const item2 = await ItemController.create({
//     name: "item#2",
//     price: 22.21,
//     description: "item#2 Description",
// });
