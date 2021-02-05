const mongoose = require('mongoose');
const film = mongoose.model('film');

/** Repository o interact with film collection */
class FilmRepo {

    /**
     * To create film record in database
     * @param {Object} data - object that has film information.
     */
    async create(data) {
        let mFilm = new film(data);
        return await mFilm.save();
    }

    /**
     * To get film from database
     * @param {Object} query - query db to get film
     */
    async retrieve(query) {
        return await film.find(query);
    }

    /**
     * To update film from database
     * @param {Object} query - query db to update film
     */
    async updateOne(id, data) {
        return await film.updateOne({_id: id}, data);
    }

    /**
     * To delete film from database
     * @param {Object} query - query db to delete film
     */
    async deleteOne(id) {
        return await film.deleteOne({_id: id});
    }
}

module.exports = FilmRepo;