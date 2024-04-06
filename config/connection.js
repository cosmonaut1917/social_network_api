const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/socialMediaDB';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

module.exports = mongoose.connection;