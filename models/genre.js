const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 100
        }
    },
    {
        toString: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

GenreSchema.virtual('url').get(function () {
    return `/catalog/genres/${this._id}`;
});

module.exports = mongoose.model('Genre', GenreSchema);
