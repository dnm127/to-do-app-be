const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoConnect = require('./util/database').mongoConnect;

const taskRoutes = require('./routes/index');

// mongoConnect((client) => {
//   app.listen(3000);
// });

const connectDB = async () => {
  mongoose
    .connect(
      'mongodb+srv://nminh:120797@to-do-app.xra9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    )
    .then((result) => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => console.log('Error', err));
};
connectDB();

const allowedOrigins = ['http://localhost:3000', '127.0.0.1:3000'];

const options = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors({ options }));

// body parser to read data from request.body
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/api', function (req, res) {
  return res.send({
    status: 'Success',
  });
});

app.use(taskRoutes);
const PORT = 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
