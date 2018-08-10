
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

const bloggerRouter = require('./blog-posts');
app.use(express.static('public'));

app.use('./blog-posts', blogRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});