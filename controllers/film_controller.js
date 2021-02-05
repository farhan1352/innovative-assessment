const filmRepo = require('../repos/film_repo');
let mFilmRepo = new filmRepo();

/**
 * This controller is being used to manage films
 */
class FilmController {

    /**
     * To create film
     * @param {Object} film - film object will hold the values for creating film
     */
    async createFilm(req, res) {
        let film = req.body;
        film.added_by = req.decoded.email;

        /** Rating is in between the given range */
        if(film && (film.rating > 0 && film.rating < 6)){
            if(film.release_date){
                film.release_date = new Date(film.release_date);
            }else{
                film.release_date = new Date();
            }

            let result = await mFilmRepo.create(film);
            console.log('Film created: ', result);
            res.status(200).send({'status': 'success', data: result}); 
        }else{
            res.status(200).send({'status': 'error', 'message':'Request body not found or the rating of the film is beyond the range(1-5)'});
        }
    }

    /**
     * To churn out all the films
     */
    async retrieveAllFilms(req, res){
        let films = await mFilmRepo.retrieveAll({});
        res.status(200).send({'status': 'success', data: films});
    }

     /**
     * To churn out any specific film
     */
    async retrieve(req, res){
        let { slug } = req.params;
        let films = await mFilmRepo.retrieveBySlug(slug);
        res.status(200).send({'status': 'success', data: films});
    }


     /**
     * To update specific film
     */
    async update(req, res){
        let { id } = req.params;
        let data = req.params.body;

        let filmsUpdated = await mFilmRepo.updateOne(id, data);
        res.status(200).send({'status': 'success', data: filmsUpdated});
    }


     /**
     * To delete any specific film
     */
    async delete(req, res){
        let { id } = req.params;
        let filmsDeleted = await mFilmRepo.deleteOne(id);
        res.status(200).send({'status': 'success', data: filmsDeleted});
    }
}

module.exports = FilmController;