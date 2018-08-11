
const express = require('express');
const morgan = require('morgan');
const app = express();

// log the http layer
app.use(morgan('common'));

const bloggerRouter = require('./blogRouter');

app.use(express.static('public'));   // static folder
app.use('/blog-posts', bloggerRouter); // call for the router

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});