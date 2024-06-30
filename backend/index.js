const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/leodora').then(() => console.log('db connected'))

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    AadharCard: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const admin = 'admin';
const adminPassword = 'admin123';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
    const { username, password, AadharCard, email, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            AadharCard,
            email,
            phone
        });
        res.status(201).json({
            message: 'User created',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ username: username }, { email:username }],
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(404).json({
                message: 'User not found or incorrect password',
                data: null
            });
            return;
        }
        res.status(200).json({
            message: 'Login successful',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error logging in',
            error: error.message
        });
    }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
