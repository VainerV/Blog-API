const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./models');



// when the root of this router is called with GET, return
// all current BlogPosts  
router.get('/', (req, res) => {
    console.log("Retreving Blog posts");
    let blPost = BlogPosts.get();
    if(blPost.length === 0){
        console.log("No Blog posts were found");
    }
  res.json(BlogPosts.get());
});


// when a new blog is posted, make sure it's
// got required fields ('title, content, author). if not,
// log an error and return a 400 status code. if okay,
// add new item to BlogPosts and return it with a 201.
router.post('/', jsonParser, (req, res) => {
  // ensure `title` , 'content and `author` are in request body
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});


// when DELETE request comes in with an id in path,
// try to delete that item from BlogPosts .
router.delete('/:id', (req, res) => {
    let blPost = BlogPosts.get(req.params.id);
    if(blPost){
        BlogPosts.delete(req.params.id);
        console.log(`Deleted BlogerPost item \`${req.params.ID}\``);
        res.status(204).end();
    }
    else{
        console.log("Error: Post not found");
        res.status(500).end();
    }
  
  
});

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `BlogPosts .update` with updated item.
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', "id"];
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
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
})

module.exports = router;