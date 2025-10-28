const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const mongobd = require('./db/connect');

app.set('trust proxy', 1);
app.use('/', routes);
app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

mongobd.connectDB((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    } 
    console.log('MongoDB connection established');
})

