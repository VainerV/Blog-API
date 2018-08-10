const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('/blog-posts');



// when the root of this router is called with GET, return
// all current ShoppingList items
router.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});


// when a new shopping list item is posted, make sure it's
// got required fields ('name' and 'checked'). if not,
// log an error and return a 400 status code. if okay,
// add new item to ShoppingList and return it with a 201.
router.post('/blog-posts', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['name', 'checked'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = ShoppingList.create(req.body.name, req.body.checked);
  res.status(201).json(item);
});


// when DELETE request comes in with an id in path,
// try to delete that item from ShoppingList.
router.delete('/blog-posts/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `ShoppingList.update` with updated item.
router.put('/blog-posts/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'budget', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping list item \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    name: req.body.name,
    budget: req.body.budget
  });
  res.status(204).end();
})

module.exports = router;