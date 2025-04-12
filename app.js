const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb+srv://kotvalhimanshu4114:KNM72SCF79hYYirn@boxcricket.kowygfa.mongodb.net/BoxCricket', {
    dbName: 'BoxCricket'
}).then(() => {
    console.log('MongoDB Connected Successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Team routes
app.use('/api/teams', require('./routes/teamroutes'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});