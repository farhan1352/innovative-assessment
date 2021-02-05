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
    async retrieveAll() {
        return await film.find({});
    }

    /**
     * To get films from database via slug
     */
    async retrieveBySlug(slug) {
        return await film.find({slug: slug});
    }

    /**
     * To update film from database
     * @param {Object} query - query db to update film
     */
    async updateOne(id, data) {
        data.last_modified = new Date();
        return await film.updateOne({_id: id}, data);
    }

    /**
     * To delete film from database
     * @param {Object} query - query db to delete film
     */
    async deleteOne(id) {
        return await film.deleteOne({_id: id});
    }

    /**
     * To delete film from database
     * @param {Object} query - query db to delete film
     */
    async deleteAll(id) {
        return await film.deleteMany({});
    }
}

module.exports = FilmRepo;