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
    name: {type: String, index: true, required: true},

    /** Slug of the film. */
    slug: {type: String, index: true, required: true},

    /** Description of the film */
    description: {type: String, required: true},

    /** Time at which film has been released */
    release_date: {type: Date, index: true, required: true},

    /** Rating of the film */
    rating: {type: Number, required: true, required: true},

    /** Price of the film in USD */
    ticket_price: {type: Number, required: true},

    /** Currency of the film price */
    ticket_price_currency: {type: String, default: 'USD' },

    /** Country of the film */
    country: {type: String, index: true, required: true},

    /** Genre of the film, multi-key index added for every element inside array */
    genre: {type: Array, index: true, required: true},

    /** URI of the thumbnail/picture of the film */
    photo: {type: String},

    /** Email of the user who added the film */
    added_by: {type: String, required: true, index: true},

    /** When the record has been last modified. */
    last_modified: {type: Date}
});

module.exports = mongoose.model('film', filmSchema);