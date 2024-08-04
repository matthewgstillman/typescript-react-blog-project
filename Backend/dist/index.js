"use strict";
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';
console.log(MONGO_URI);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("MongoDB connection error:", err));
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    }
    else {
        console.log(`Server is running on port ${PORT}`);
    }
});
