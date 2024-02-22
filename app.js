const express = require("express");
const app = express();
const mongoose = require('mongoose');

//Models
const Users = require('./Models/crud')


mongoose
    .connect("mongodb+srv://admin:admin@project1.cfkyt.mongodb.net/Sampletoday?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB CONNECTED");
    }).catch((err) => {
        console.error("Error connecting to the database:", err);
    });



app.use(express.json());


app.get("/", (req, res) => {
    res.send("Server Running");
});



// GET all users
app.get("/getall", (req, res) => {
    Users.find().then((data) => {
        res.send(data);
    }).catch(err => {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    });
});

// POST a new user
app.post("/adduser", (req, res) => {
    const newUser = new Users(req.body);
    newUser.save().then(() => {
        res.send("User added successfully");
    }).catch(err => {
        console.error("Error adding user:", err);
        res.status(500).send("Error adding user");
    });
});

// DELETE a user
app.delete("/deleteuser/:id", (req, res) => {
    const userId = req.params.id;
    Users.findByIdAndDelete(userId).then(() => {
        res.send("User deleted successfully");
    }).catch(err => {
        console.error("Error deleting user:", err);
        res.status(500).send("Error deleting user");
    });
});

// UPDATE a user
app.put("/updateuser/:id", (req, res) => {
    const userId = req.params.id;
    Users.findByIdAndUpdate(userId, req.body).then(() => {
        res.send("User updated successfully");
    }).catch(err => {
        console.error("Error updating user:", err);
        res.status(500).send("Error updating user");
    });
});

app.listen(3000, () => {
    console.log("Server Running on port 3000");
});
