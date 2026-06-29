const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Report = require("./models/Report");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/crimeDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// SIGNUP
app.post("/signup", async (req, res) => {

    try {

        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {

            return res.json({
                success: false,
                message: "Email already exists"
            });

        }

        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        res.json({
            success: true
        });

    } catch (error) {

        res.json({
            success: false,
            message: "Signup Failed"
        });

    }

});


// LOGIN
app.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (user) {

            res.json({
                success: true,
                fullname: user.fullname
            });

        } else {

            res.json({
                success: false
            });

        }

    } catch (error) {

        res.json({
            success: false
        });

    }

});


// CRIME REPORT
app.post("/report", async (req, res) => {

    try {

        const report = new Report({
            title: req.body.title,
            category: req.body.category,
            location: req.body.location,
            description: req.body.description,
            reporter: req.body.reporter
        });

        await report.save();

        res.json({
            success: true
        });

    } catch (error) {

        res.json({
            success: false
        });

    }

});


// HOME
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/dashboard.html", (req, res) =>{
    res.sendFile(__dirname + "/public/dashboard.html");
});

app.get("/logout", (req, res) =>{
    res.redirect("/");
});
app.use(express.static("public"));
// START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});