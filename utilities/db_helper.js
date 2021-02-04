const mongoose = require('mongoose');
const config = require('../config');


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


module.exports = {
    connect: connect
}

