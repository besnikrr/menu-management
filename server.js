const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
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
