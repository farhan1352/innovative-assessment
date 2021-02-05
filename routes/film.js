const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film_controller');
const mFilmController = new filmController();

const authMw = require('../middlewares/auth');
let mAuth = new authMw();

router.post('/', mAuth.authenticateToken, mFilmController.createFilm);
router.get('/', mAuth.authenticateToken, mFilmController.retrieveAllFilms);
router.get('/:slug', mAuth.authenticateToken, mFilmController.retrieve);

router.put('/:id', mAuth.authenticateToken, mFilmController.update);
router.delete('/:id', mAuth.authenticateToken, mFilmController.delete);

module.exports = router;
