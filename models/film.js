const mongoose = require('mongoose');
const shortId = require('mongoose-shortid-nodeps');
const {Schema} = mongoose;

/**
 * Schema of the client collection
 */
const filmSchema = new Schema({
    
    /** Short ids; these are usually human-friendly and take less space. Highly encouraged with high scale database. */
    _id: {type: shortId, length: 8, retries: 4},
    
    /** Name of the film. */
    name: {type: String, index: true},

    /** Slug of the film. */
    slug: {type: String, index: true},

    /** Description of the film */
    description: {type: String },

    /** Time at which film has been released */
    release_date: {type: Date, index: true},

    /** Rating of the film */
    rating: {type: Number},

    /** Price of the film in USD */
    ticket_price: {type: Number},

    /** Currency of the film price */
    ticket_price_currency: {type: String, default: 'USD' },

    /** Country of the film */
    country: {type: String, index: true},

    /** Genre of the film, multi-key index added for every element inside array */
    genre: {type: Array, index: true},

    /** URI of the thumbnail/picture of the film */
    photo: {type: String},

    /** When the record has been last modified. */
    last_modified: {type: Date}
});

module.exports = mongoose.model('film', filmSchema);