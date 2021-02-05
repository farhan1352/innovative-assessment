const jwt = require('jsonwebtoken');
const config = require('../config');

const authRepo = require('../repos/auth_repo');
const mAuthRepo = new authRepo();

class AuthService {

    /**
     * 
     * @param {Object} email - email for which access token and refresh token needs to be generated
     * getTokens function is used to generate tokens for access and refresh.
     */
    getTokens = async(email) => {
        var accessToken = jwt.sign({ email: email }, config.access_token_secret, {expiresIn: '1h'});
        var refreshToken = jwt.sign({ email: email }, config.refresh_token_secret);
        
        /** Check if access token already exist, if exist, update that token, if not exist, create one */
        let alreadyExistToken = await mAuthRepo.retrieveOne(email)
        if(alreadyExistToken){
            mAuthRepo.updateRefreshToken(email, refreshToken);
        }else{
            mAuthRepo.createToken(email, refreshToken);
        }

        return {access_token: accessToken, refresh_token: refreshToken};
    }

    /**
     * 
     * authenticateToken function is used to authenticate token if its valid or expired
     */
    authenticateToken = (req, res, next) => {
        let token = req.headers['x-access-token'];
        if (!token){
            return res.status(401).send({ status: 'auth_failed', message: 'No token provided' });
        }
        
        jwt.verify(token, config.access_token_secret, function(err, decoded) {
            if (err) {
                return res.status(500).send({ status: 'auth_failed', message: 'Failed to authenticate token' });
            }
            
            req.decoded = decoded;
            next();
        });
    }

    /**
     * 
     * getRefreshToken function is used to refresh the both tokens(access/refresh) once access token is exuipred
     */
    getRefreshToken = async(req, res, next) => {
        let { token } = req.body;
        if (!token){
            return res.status(206).send({ status: 'error', message: 'No token provided' });
        }
        
        /** Check and match the existing token */
        let alreadyExistToken = await mAuthRepo.retrieveOneByRefreshToken(token)
        if(alreadyExistToken){
            let tokens = await this.getTokens(alreadyExistToken.email);
            return res.status(200).send({ status: 'success', data: tokens });
        }else{
            return res.status(206).send({ status: 'error', message: 'Invalid token provided' });
        }
    }
}

module.exports = AuthService;