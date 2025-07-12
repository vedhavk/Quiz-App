const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
app.use(express.json());

app.use(session({
  secret: "sw@dz@123",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/session-db" }),
  cookie: { maxAge: 3600000 }
}));

app.get("/login", (req, res) => {
  req.session.username = "Vedha";
  res.send("Session started for Vedha!");
});

app.get("/profile", (req, res) => {
  const user = req.session.username;
  res.send(`Welcome back, ${user}`);
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("Error logging out");
    res.clearCookie("connect.sid");
    res.send("Logged out successfully!");
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
