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
            if (err) {
                return next(err);
            }

            res.render('book_list', { title: 'Book List', booksList: booksList });
        });
};

exports.detail = (req, res, next) => {
    async.parallel(
        {
            book: callback => {
                Book.findById(req.params.id)
                    .populate('author genre')
                    .exec(callback);
            },
            bookInstances: callback => {
                BookInstance.find({ book: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.book == null) {
                const err = new Error('Book not found');
                err.status = 404;

                return next(err);
            }

            res.render('book_detail', {
                title: 'Book detail',
                book: results.book,
                bookInstances: results.bookInstances
            });
        }
    );
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
