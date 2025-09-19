import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Todo } from "./model/todoSchema.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:admin@cluster0.2b1v4xh.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Routes
// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add todo
app.post("/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

// Update todo text
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text }, // only text update
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
