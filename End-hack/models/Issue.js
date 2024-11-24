const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g., "Broken Bench"
    description: { type: String, required: true }, // e.g., "The bench in the park is broken"
    location: {
        lat: { type: Number, required: true }, // Latitude
        lng: { type: Number, required: true }, // Longitude
    },
    status: { type: String, default: 'recently_flagged' }, // e.g., "recently_flagged", "highly_reported", "resolved"
    votes: { type: Number, default: 0 } // Number of flags
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);