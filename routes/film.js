const express = require('express');
const router = express.Router();
const mFilmsContr = require('../controllers/film_controller');
const filmController = new mFilmsContr();

router.post('/', filmController.createFilm);
router.get('/', filmController.retrieveAllFilms);
router.get('/:slug', filmController.retrieve);

router.put('/:id', filmController.update);
router.delete('/:id', filmController.delete);

module.exports = router;
