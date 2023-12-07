const { check } = require("express-validator");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const todoSchema = new Schema({
  todoTask: { type: String, required: true },
  todoDescription: { type: String, required: true, minLength: 3 },
});

const Todo = model("todo", todoSchema);

module.exports = { Todo };

module.exports.todoRequestValidators = [
  check("todoTask", "Minimum length of character is 5").isLength({ min: 5 }),
  check("todoDescription", "Minimum length of character is 10").isLength({
    min: 10,
  }),
];
