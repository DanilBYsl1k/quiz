const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routesAuth = require('./routes/authRouter.js');
const routesTest = require('./routes/testListRouter.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routesAuth);
app.use(routesTest);

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server running at http://localhost:${port}`);
});