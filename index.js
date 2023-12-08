const express = require("express");
const { connectToMongoDb } = require("./config/db");
const { todoRouter } = require("./todos/todo-router");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());

// configuration middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Morgan Use
app.use(morgan("combined"));
// app.use(morgan("tiny"));
// morgan.token("host", (req, res) => {
//   return req.hostname;
// });

// app.use(morgan(`:method : url :host`));

// api route
app.use("/todo", todoRouter);

async function initNodeJsApplication() {
  try {
    await connectToMongoDb();

    app.listen(3000, () => {
      console.log("port:3000 Running");
    });
  } catch (error) {
    console.log(error);
  }
}

initNodeJsApplication();
