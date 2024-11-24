const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const issueRoutes = require('./routes/issues');
const authRoutes = require('./routes/auth'); // Import auth routes

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://aadiarora151:vXwkP97BaWm8PN1j@cluster0.fyaax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Use the routes
app.use('/api/issues', issueRoutes);  // Routes related to issues
app.use('/api/auth', authRoutes);  // Routes related to authentication

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




    