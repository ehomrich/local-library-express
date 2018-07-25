const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');

exports.index = (req, res, next) => {
    async.parallel(
        {
            bookCount: callback => {
                Book.countDocuments({}, callback);
            },
            bookInstanceCount: callback => {
                BookInstance.countDocuments({}, callback);
            },
            bookInstanceAvailableCount: callback => {
                BookInstance.countDocuments({ status: 'Available' }, callback);
            },
            authorCount: callback => {
                Author.countDocuments({}, callback);
            },
            genreCount: callback => {
                Genre.countDocuments({}, callback);
            }
        },
        (err, results) => {
            res.render('index', {
                title: 'Local Library Home',
                error: err,
                data: results
            });
        }
    );
};

exports.list = (req, res, next) => {
    Book.find({}, 'title author')
        .populate('author')
        .exec((err, booksList) => {
            if (err) { return next(err); }

            res.render('book_list', { title: 'Book List', booksList: booksList });
        });
};

exports.detail = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

exports.create_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book create GET');
};

exports.create_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book create POST');
};

exports.delete_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

exports.delete_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

exports.update_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book update GET');
};

exports.update_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book update POST');
};
