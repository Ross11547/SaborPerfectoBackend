const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usuario = require("./controllers/usuario");

const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(usuario);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
