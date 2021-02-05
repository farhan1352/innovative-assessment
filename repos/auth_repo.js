const mongoose = require('mongoose');
const authtoken = mongoose.model('authtoken');

/** Repository o interact with authtoken collection */
class AuthRepo {

    /**
     * To create authtoken record in database
     * @param {Object} data - object that has authtoken information.
     */
    async createToken(email, refreshToken) {
        let data = {email: email, refresh_token: refreshToken};
        let mAuthtoken = new authtoken(data);
        return await mAuthtoken.save();
    }

    /**
     * To get authtoken from database
     * @param {Object} email - email to get authtoken
     */
    async retrieveOne(email) {
        return await authtoken.findOne({email: email});
    }

    /**
     * To get authtoken from database
     * @param {Object} token - query db to get authtoken
     */
    async retrieveOneByRefreshToken(token) {
        return await authtoken.findOne({refresh_token: token});
    }

    /**
     * To update authtoken from database
     * @param {Object} query - query db to update authtoken
     */
    async updateRefreshToken(email, token) {
        return await authtoken.updateOne({email: email}, {refresh_token: token, last_modified: new Date()});
    }

    /**
     * To delete authtoken from database
     * @param {Object} query - query db to delete authtoken
     */
    async deleteOne(email) {
        return await authtoken.deleteOne({email: email});
    }
}

module.exports = AuthRepo;