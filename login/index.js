// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 5050;

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true
}));

app.use("/front_end", express.static(path.join(__dirname, '../front_end')));
app.use("/music_sounds", express.static(path.join(__dirname, '../music_sounds')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// MongoDB модел за потребител
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Свързване с MongoDB
mongoose.connect('mongodb://localhost:27017/piano_users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Логин рут
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        const isPasswordCorrect = password == user.password;
        if (isPasswordCorrect) {
            req.session.userId = user._id;
            return res.json({ success: true });
        }
    }

    res.json({success: false, message: "The user was not found!"});
});

// Стартиране на сървъра
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
