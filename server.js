var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

Recipe = require('./models/recipe');

// Connect to Mongoose
mongoose.connect(
  'mongodb://recipe_book:heroku220187@ds239412.mlab.com:39412/heroku_8xk8zhk3'
);
var db = mongoose.connection;

app.get('/', function(req, res) {
  res.header('Content-Type', 'application/json');
  res.json({ status: 'Working!' });
});

app.get('/recipelist', function(req, res) {
  Recipe.getRecipes(function(err, recipes) {
    if (err) {
      console.log(err);
    }
    res.json(recipes);
  });
});

app.post('/addrecipe', function(req, res) {
  var recipe = req.body;
  Recipe.addRecipe(recipe, function(err, recipe) {
    console.log(req);
    if (err) {
      console.log(err);
    }
    res.json(recipe);
  });
});

app.delete('/deleterecipe/:id', function(req, res) {
  var id = req.params.id;
  Recipe.deleteRecipe(id, function(err, recipe) {
    if (err) {
      console.log(err);
    }
    res.json(recipe);
  });
});

app.get('/retrieverecipe/:id', function(req, res) {
  var id = req.params.id;
  Recipe.getRecipeById(id, function(err, recipe) {
    if (err) {
      console.log(err);
    }
    res.json(recipe);
  });
});

app.listen(process.env.PORT || 8000);
console.log('Running locally at port 8000...');
