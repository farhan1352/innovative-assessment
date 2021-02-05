const filmRepo = require('../repos/film_repo');
let mFilmRepo = new filmRepo();

const path = require('path');
const fs = require('fs');

class DBSeeder {

    /** Seed the db */
    seed = () => {
        this.seedFilms();
    }

    /** Seed film collection */
    seedFilms = async() => {
        await mFilmRepo.deleteAll();
        
        var jsonPath = path.join(__dirname, '..', 'seeders', 'films.json');
        const filmsCollection = fs.readFileSync(path.resolve(jsonPath), 'utf-8');
        let filmsArray = JSON.parse(filmsCollection);
        if(filmsArray.length > 0){
            filmsArray.forEach(film =>  {
                /** converting string date object into the iso date format */
                film.release_date = new Date(film.release_date.$date);

                if(film.last_modified){
                    film.last_modified = new Date(film.last_modified);
                }

                mFilmRepo.create(film);
            });
        }
        console.log(`Database successfully seeded with ${filmsArray.length} films`);
    }
}

module.exports = DBSeeder;

