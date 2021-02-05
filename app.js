const express = require('express');
const app = express();
const http = require('http').createServer(app);
const config = require('./config');

/** DB Helper */
const dbHelper = require('./helpers/db_helper');
let mHelper = new dbHelper();


/** Connect to database */
mHelper.connect().then((response) => {
    console.log(response);
    mHelper.registerSchema();
    seed();
    startListening();
}).catch((err) => {
    console.log(err);
});

/**Start listening on specified port */
startListening = () => {
    let {port} = config;
    http.listen(port, () =>  {
        importRoutes();
        console.log(`Innovative app listening on port ${port}`);
    })
}

/** Import routes */
importRoutes = () => {
    app.use('/', require('./routes/index'));
    app.use('/films', require('./routes/film'));
}

/** Seed database */
seed = () => {
    /** DB Seeder */
    const seeder = require('./helpers/db_seeder');
    let mSeeder = new seeder();
    mSeeder.seed();
}