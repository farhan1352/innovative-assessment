let chai = require('chai');
const { expect } = require('chai');
let should = chai.should();

//Parent block
describe('Innovative Solution Assessment', () => {

  describe("DB Connection", function() {
    it("It should connect to databse without errors", function(done) {
      /** DB Helper */
      const dbHelper = require('../helpers/db_helper');
      let mHelper = new dbHelper();

      /** Connect to database */
        mHelper.connect().then((response) => {
          expect(response).to.equal('Connected to database'); 
          mHelper.registerSchema();
          mHelper.seed();
          done();
        }).catch((err) => {
          console.log(err);
          expect(err).to.equal(null); 
        });
    });

    describe("Film Seeding", function() {

      it("It should print the film seeding status", async() => {
          let filmRepo = require('../repos/film_repo');
          let mFilmRepo = new filmRepo();

          let films = await mFilmRepo.retrieveAll();
          expect(films.length).greaterThan(0); 
      });
  });
  });
});