const mongoose = require('mongoose');
const user = mongoose.model('user');

/** Repository o interact with user collection */
class UserRepo {

    /**
     * To create user record in database
     * @param {Object} data - object that has user information.
     */
    async create(data) {
        let mUser = new user(data);
        return await mUser.save();
    }

    /**
     * To get user from database
     * @param {Object} email
     */
    async retrieveOne(email) {
        return await user.findOne({email: email});
    }

    /**
     * To update user from database
     * @param {Object} query - query db to update user
     */
    async updateOne(email, data) {
        data.last_modified = new Date();
        return await user.updateOne({email: email}, data);
    }

    /**
     * To delete user from database
     * @param {Object} query - query db to delete user
     */
    async deleteOne(email) {
        return await user.deleteOne({email: email});
    }
}

module.exports = UserRepo;