const express = require('express');
// Lodash utils library
const _ = require('lodash');

const router = express.Router();

// Create RAW data array
let movies = [{
  id: "0"
}];


/* GET users listing. */
router.get('/', (req, res) => {
  // Get List of movies and return JSON
  res.status(200).json({ movies });
});

/* GET one movie. */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // Find user in DB
  const user = _.find(movies, ["id", id]);
  // Return user
  res.status(200).json({
    message: 'Movie found!',
    movies 
  });
});

/* PUT new movie. */
router.put('/', (req, res) => {
    // Get the data from request from request
    const { movies } = req.body;

    // Make a request for a user with a given ID
    axios.get('http://www.omdbapi.com/?t=inception&apikey=dfdcf431') // => faire pour film en général
    /////${API_URL}?q=${this.city}&units=metric&appid=${API_KEY}
    ////http://www.omdbapi.com/?t=
    .then(function (res) {
    // handle success
    console.log(res);
    const{movie}=res.date['Title'];
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .then(function () {
    // always executed
    });






  // Create new unique id
  const id = _.uniqueId();
  // Insert it in array (normaly with connect the data with the database)
  movies.push({ movies, id });
  // Return message
  res.json({
    message: `Just added ${id}`,
    movies: { movies, id }
  });
});

/* DELETE movie. */
router.delete('/:id', (req, res) => {
  // Get the :id of the movie we want to delete from the params of the request
  const { id } = req.params;

  // Remove from "DB"
  _.remove(movies, ["id", id]);

  // Return message
  res.json({
    message: `Just removed ${id}`
  });
});

/* UPDATE movie. */
router.post('/:id', (req, res) => {
  // Get the :id of the user we want to update from the params of the request
  const { id } = req.params;
  // Get the new data of the movie we want to update from the body of the request
  const { user } = req.body;
  // Find in DB
  const userToUpdate = _.find(movies, ["id", id]);
  // Update data with new data (js is by address)
  userToUpdate.movies = movies;

  // Return message
  res.json({
    message: `Just updated ${id} with ${movies}`
  });
});

module.exports = router;
