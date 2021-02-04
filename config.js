const env = process.env.NODE_ENV || 'development';

let config = {
    development: {
        port: '3000',
        db_conn_string: 'mongodb://localhost:27017/assessment'

    },
    staging: {
        port: '3000',
        db_conn_string: 'mongodb://localhost:27017/assessment'
    },
    production: {
        port: process.env.PW_PORT,
        db_conn_string: process.env.PW_MONGO_DB_URL
    }
};

console.log("---", env);

if (env === 'development') config = config.development;
if (env === 'staging') config = config.staging;
if (env === 'production') config = config.production;

module.exports = config;
