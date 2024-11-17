import express from "express";
import cors from "cors";
import usuario from "./controllers/usuario.js";
const app = express();
const port = 3000;
import bodyParser from "body-parser";
app.use(cors({ origin: "*" }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(usuario);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
