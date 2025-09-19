import mongoose from "mongoose";

// Schema + Model
const todoSchema = new mongoose.Schema({
    text: String
  });
  
export  const Todo = mongoose.model("Todo", todoSchema);
  