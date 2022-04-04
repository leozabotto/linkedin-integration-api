require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(process.env.PORT, () => {
	console.log('LinkedIn Integration API is running on PORT ' + process.env.PORT);
});