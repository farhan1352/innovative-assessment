const mongoose = require('mongoose');
const config = require('../config');

class DBHelper {

    /**Connection to mongo db */
    connect = () => {
        return new Promise((resolve, reject) => {
            let {db_conn_string} = config;
            mongoose.connect(db_conn_string, {useUnifiedTopology:true, useNewUrlParser:true}, (err, db) => {
                if(err){
                    console.log('Failed to connect to db, possible cause: ', e);
                    reject(e);
                }
                resolve('Connected to database');
            });
        });
    }

    /** To get schema register */
    registerSchema = () => {
        require('../models/film');
        require('../models/user');
        require('../models/auth_token');
    }

    /** Seed database */
    seed = () => {
        /** DB Seeder */
        const seeder = require('../helpers/db_seeder');
        let mSeeder = new seeder();
        mSeeder.seed();
    }
}

module.exports = DBHelper;

