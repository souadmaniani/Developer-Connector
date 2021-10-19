const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");
const cors = require("cors");
const app = express();
const path = require("path");

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MONGODB
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
// check if we r on heroku
if (process.env.NODE_ENV === "production") {
  // serve static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    // for any route load the react index html file
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
