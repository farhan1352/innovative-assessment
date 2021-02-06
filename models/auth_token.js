const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const shortId = require('mongoose-shortid-nodeps');
const {Schema} = mongoose;

/**
 * Schema of the user collection
 */
const authTokenSchema = new Schema({
    
    /** Short id; these are usually human-friendly and take less space. Highly encouraged with high scale database. */
    _id: {type: shortId, length: 8, retries: 4},
    
    /** Email of the user. . Should be unique*/
    email: {type: String, unique: true, required: true},

    /** Refresh token of the user */
    refresh_token: {type: String, index: true, required: true},

    /** Time at which record has been created */
    added_date: {type: Date, index: true, default: Date.now},

    /** When the record has been last modified. */
    last_modified: {type: Date}
});

module.exports = mongoose.model('authtoken', authTokenSchema);