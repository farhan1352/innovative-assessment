const env = process.env.NODE_ENV || 'development';

const access_token_secret = '0IRYmKsSdBcnPHFQE5Oooia2sGgizeitYoCHYkY78UF9tqShZX1JeEEproNf'
const refresh_token_secret = 'uCGzxYiCc8qfesD5dOfndF2cmxKUyuStKywFZUDz7QS6LkrxQNYNm7LxLQnd'

let config = {
    development: {
        port: '3000',
        db_conn_string: 'mongodb://localhost:27017/assessment',
        access_token_secret: access_token_secret,
        refresh_token_secret: refresh_token_secret
    },
    staging: {
        port: '3000',
        db_conn_string: 'mongodb://localhost:27017/assessment',
        access_token_secret: access_token_secret,
        refresh_token_secret: refresh_token_secret
    },
    production: {
        port: process.env.PW_PORT,
        db_conn_string: process.env.PW_MONGO_DB_URL,
        access_token_secret: access_token_secret,
        refresh_token_secret: refresh_token_secret
    }
};

console.log("---", env);

if (env === 'development') config = config.development;
if (env === 'staging') config = config.staging;
if (env === 'production') config = config.production;

module.exports = config;
