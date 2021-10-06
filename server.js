const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const passport = require('passport')
const app = express()

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MONGODB
mongoose.connect(db)
.then(() => console.log("MongoDb connected"))
.catch((err) => console.log(err));

app.use(express.json())

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 5000

app.listen(port, ()=> console.log(`server running on port ${port}`))