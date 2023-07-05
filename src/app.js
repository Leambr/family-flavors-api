const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3120;

app.use(morgan("dev")).use(express.json());
app.get("/", (req, res) => res.send("Hello, express!"));

app.listen(port, () =>
    console.log(
        `Notre application Node est démarrée sur : http://localhost:${port}`
    )
);
