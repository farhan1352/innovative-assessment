const filmRepo = require('../repos/film_repo');
let mFilmRepo = new filmRepo();

class DBSeeder {

    /** Seed the db */
    seed = () => {
        this.seedFilms();
    }

    /** To seed film collection */
    seedFilms = () => {
        let film1 = {
            name: 'Film Title 1', slug: 'film-title-1', description: 'This is the description of film title 1', release_date: new Date(), rating: 3,
            ticket_price: 15, country: 'Pakistan', genre: ['Genre 1', 'Genre 2', 'Genre 3'], photo: 'https://s3bucket-url'
        }

        let film2 = {
            name: 'Film Title 2', slug: 'film-title-2', description: 'This is the description of film title 2', release_date: new Date(), rating: 5,
            ticket_price: 10, country: 'USA', genre: ['Genre 10', 'Genre 12', 'Genre 15'], photo: 'https://s3bucket-url'
        }

        let film3 = {
            name: 'Film Title 3', slug: 'film-title-3', description: 'This is the description of film title 3', release_date: new Date(), rating: 4,
            ticket_price: 18, country: 'Austrailia', genre: ['Genre 31', 'Genre 32', 'Genre 33'], photo: 'https://s3bucket-url'
        }

        mFilmRepo.create(film1);
        mFilmRepo.create(film2);
        mFilmRepo.create(film3);

        console.log('Database successfully seeded with 3 films');
    }
}

module.exports = DBSeeder;

