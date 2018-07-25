const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
    async.parallel(
        {
            authors: callback => {
                Author.find(callback);
            },
            genres: callback => {
                Genre.find(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            res.render('book_form', {
                title: 'Create book',
                authors: results.authors,
                genres: results.genres
            });
        }
    );
};

exports.create_post = [
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') {
                req.body.genre = [];
            } else {
                req.body.genre = new Array(req.body.genre);
            }
        }
        next();
    },

    body('title', 'Title must not be empty.')
        .isLength({ min: 1 })
        .trim(),
    body('author', 'Author must not be empty.')
        .isLength({ min: 1 })
        .trim(),
    body('summary', 'Summary must not be empty.')
        .isLength({ min: 1 })
        .trim(),
    body('isbn', 'ISBN must not be empty')
        .isLength({ min: 1 })
        .trim(),

    sanitizeBody('*')
        .trim()
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var book = new Book({
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
        });

        if (!errors.isEmpty()) {
            async.parallel(
                {
                    authors: function (callback) {
                        Author.find(callback);
                    },
                    genres: function (callback) {
                        Genre.find(callback);
                    }
                },
                function (err, results) {
                    if (err) {
                        return next(err);
                    }

                    for (let genreTmp of results.genres) {
                        if (book.genre.indexOf(genreTmp._id) > -1) {
                            genreTmp.checked = 'true';
                        }
                    }
                    res.render('book_form', {
                        title: 'Create book',
                        authors: results.authors,
                        genres: results.genres,
                        book: book,
                        errors: errors.array()
                    });
                }
            );
            
            return;
        } else {
            book.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.redirect(book.url);
            });
        }
    }
];

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
