const { Todo } = require("./todo-model");
const { generateErrorObjectExpressValidator } = require("../utils");

//get All Todos
module.exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).select("-__v");
    if (!todos) {
      return res.json({
        data: null,
        error: "No Todo Found",
      });
    }
    return res.json({
      error: null,
      data: {
        todos: [...todos],
      },
    });
  } catch (error) {
    return res.json({
      data: null,
      error: "Failed To Fetch User",
    });
  }
};

// get Todo By Id
module.exports.getTodoById = async (req, res) => {
  const id = req.params.id;

  try {
    const getTodoById = await Todo.findById(id).select("-__v").lean();
    if (!getTodoById) {
      return res.status(404).json({
        data: null,
        error: "no such id found",
      });
    }
    return res.json({
      error: null,
      data: {
        singleTodo: getTodoById,
      },
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      error: "unexpeced server error",
    });
  }
};

// add Todo
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
    return res.json({
      error: null,
      data: {
        addTodo: {
          _id: todo._id,
          todoTask,
          todoDescription,
        },
      },
    });
    // res.redirect("/");
  } catch (error) {
    console.log("error is : ", error);
    return res.status(500).json({
      data: null,
      error: error.message,
    });
  }
};

// Delete Todo By Id
module.exports.deleteTodoById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteTodoById = await Todo.findByIdAndDelete(id)
      .select("-__v")
      .lean();
    if (!deleteTodoById) {
      return res.status(404).json({
        data: null,
        error: "no such id found",
      });
    }
    return res.json({
      error: null,
      data: {
        deleteTodoById,
      },
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      error: "unexpeced server error",
    });
  }
};
