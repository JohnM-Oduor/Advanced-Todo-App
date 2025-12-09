import mongoose from "mongoose"

export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://John:John@cluster0.wtcrwjq.mongodb.net/todo-app');
  console.log("DB Connected")
}