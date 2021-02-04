const express = require('express');
const app = express();
const http = require('http').createServer(app);
const config = require('./config');
const dbHelper = require('./utilities/db_helper');


/** Connect to database */
dbHelper.connect().then((response) => {
    console.log(response);
    startListening();
}).catch((err) => {
    console.log(err);
});


/**Start listening on specified port */
startListening = () => {
    let {port} = config;
    http.listen(port, () =>  {
        console.log(`Innovative app listening on port ${port}`);
    })
}