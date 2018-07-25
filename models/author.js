const mongoose = require('mongoose');

const moment = require('moment');

const AuthorSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            max: 100
        },
        family_name: {
            type: String,
            required: true,
            max: 100
        },
        date_of_birth: { type: Date },
        date_of_death: { type: Date }
    },
    {
        toString: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

AuthorSchema.virtual('name').get(function () {
    return `${this.family_name}, ${this.first_name}`;
});

AuthorSchema.virtual('url').get(function () {
    return `/catalog/authors/${this._id}`;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function () {
    return moment(this.date_of_birth).format('DD-MM-YYYY');
});

AuthorSchema.virtual('date_of_death_formatted').get(function () {
    return moment(this.date_of_death).format('DD-MM-YYYY');
});

module.exports = mongoose.model('Author', AuthorSchema);
