const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const mongobd = require('./db/connect');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB

mongobd.connectDB((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    } 
    console.log('MongoDB connection established');
})


app.use('/', routes);
app.use('/api', require('./routes/api'));