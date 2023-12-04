const express = require("express");
const { connectToMongoDb } = require("./config/db");
const { todoRouter } = require("./todos/todo-router");

const app = express();

// configuration middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

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
