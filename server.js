const express = require('express');
const app = express();
const port = 3001;
const db = require("./config/connection");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes"));

db.once("open", () => {
    app.listen(port, () => {
        console.log(`API server running on port ${port}!`);
    });
});