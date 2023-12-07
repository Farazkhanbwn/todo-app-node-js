const express = require("express");
const todoController = require("./todo-controller");
const { todoRequestValidators } = require("./todo-model");

const todoRouter = express.Router();

todoRouter.get("/all", todoController.getAllTodos);

todoRouter.get("/:id", todoController.getTodoById);

todoRouter.post("/add", todoRequestValidators, todoController.addTodo);

todoRouter.get("/delete/:id", todoController.deleteTodoById);

module.exports = {
  todoRouter,
};
