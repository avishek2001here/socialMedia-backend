import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
const app=express();
mongoose.connect("mongodb+srv://avishek:avishek@blog.nywbfqn.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("connected"));
app.listen(5000,()=>console.log("App Started"));
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog", blogRouter);
//console.log("hello");