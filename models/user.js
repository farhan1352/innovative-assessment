const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const shortId = require('mongoose-shortid-nodeps');
const {Schema} = mongoose;

/**
 * Schema of the user collection
 */
const userSchema = new Schema({
    
    /** Short id; these are usually human-friendly and take less space. Highly encouraged with high scale database. */
    _id: {type: shortId, length: 8, retries: 4},
    
    /** Name of the user. */
    name: {type: String},

    /** Email of the user. Should be unique */
    email: {type: String, required: true, unique: true},

    /** Password */
    password: {type: String, required: true },

    /** Avatar of the user */
    avatar: {type: String, default: 'https://s3-url.jpg' },

    /** Time at which record has been created */
    added_date: {type: Date, index: true, default: Date.now},

    /** When the record has been last modified. */
    last_modified: {type: Date}
});

module.exports = mongoose.model('user', userSchema);