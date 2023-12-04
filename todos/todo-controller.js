const { Todo } = require("./todo-model");
const { generateErrorObjectExpressValidator } = require("../utils");

module.exports.getAllTodos = async (req, res) => {
  const todos = await Todo.find({});
  res.render("index", { todos });
};

module.exports.addTodo = async (req, res) => {
  const { todoDescription, todoTask } = req.body;

  const { errors, hasErrors } = generateErrorObjectExpressValidator(req);
  if (hasErrors) {
    return res.status(400).json({ errors });
  }

  try {
    const todo = new Todo({
      todoDescription,
      todoTask,
    });

    await todo.save();
    res.redirect("/");
  } catch (error) {
    console.log("error : ", error);
  }
};

module.exports.deleteTodoById = async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndDelete(id);
  res.redirect("/");
};
