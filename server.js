const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const profil = require('./routes/api/profil')
const posts = require('./routes/api/posts')

const app = express()

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MONGODB
mongoose.connect(db)
.then(() => console.log("MongoDb connected"))
.catch((err) => console.log(err));
// recognize the incoming Request Object as a JSON Object
app.use(express.json())

// Use Routes
app.use('/api/users', users);
app.use('/api/profil', profil);
app.use('/api/posts', posts);

const port = process.env.port || 5000

app.listen(port, ()=> console.log(`server running on port ${port}`))