// Dependencies
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Establish Mongoose Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

// Connection Events
mongoose.connection
.on("open", () => console.log("You are connected to mongoose"))
.on("close", () => console.log("You are disconnected from mongoose"))
.on("error", () => console.log(error));

// Models
const TodoSchema = new mongoose.Schema({
    reminder: String,
    completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


// Routes 
// Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
})

// Index Route
app.get("/todo", async (req, res) => {
    try {
        res.json(await Todo.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Show Route
app.get("/todo/:id", async (req, res) => {
    try {
        res.json(await Todo.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create Route
app.post("/todo", async (req, res) => {
    try {
        res.json(await Todo.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});

// Update Route
app.put("/todo/:id", async (req, res) => {
    try {
        res.json(
            await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete Route
app.delete("/todo/:id", async (req, res) => {
    try {
        res.json(await Todo.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Listener
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})