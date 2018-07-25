const BookInstance = require('../models/bookinstance');

const Book = require('../models/book');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.list = (req, res, next) => {
    BookInstance.find()
        .populate('book')
        .exec((err, bookinstancesList) => {
            if (err) {
                return next(err);
            }

            res.render('bookinstance_list', {
                title: 'Book Instance List',
                bookinstancesList: bookinstancesList
            });
        });
};

exports.detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err, bookInstance) => {
            if (err) {
                return next(err);
            }

            if (bookInstance == null) {
                const err = new Error('Book copy not found');
                err.status = 404;

                return next(err);
            }

            res.render('bookinstance_detail', {
                title: 'Book',
                bookInstance: bookInstance
            });
        });
};

exports.create_get = (req, res, next) => {
    Book.find({}, 'title').exec((err, books) => {
        if (err) {
            return next(err);
        }

        res.render('bookinstance_form', {
            title: 'Create book instance',
            books: books
        });
    });
};

exports.create_post = [
    body('book', 'Book must be specified')
        .isLength({ min: 1 })
        .trim(),
    body('imprint', 'Imprint must be specified')
        .isLength({ min: 1 })
        .trim(),
    body('due_back', 'Invalid date')
        .optional({ checkFalsy: true })
        .isISO8601(),

    sanitizeBody('book')
        .trim()
        .escape(),
    sanitizeBody('imprint')
        .trim()
        .escape(),
    sanitizeBody('status')
        .trim()
        .escape(),
    sanitizeBody('due_back').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        });

        if (!errors.isEmpty()) {
            Book.find({}, 'title').exec((err, books) => {
                if (err) {
                    return next(err);
                }

                res.render('bookinstance_form', {
                    title: 'Create book instance',
                    books: books,
                    selectedBook: bookInstance.book._id,
                    errors: errors.array(),
                    bookInstance: bookInstance
                });
            });

            return;
        } else {
            bookInstance.save(err => {
                if (err) {
                    return next(err);
                }

                res.redirect(bookInstance.url);
            });
        }
    }
];

exports.delete_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

exports.delete_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

exports.update_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

exports.update_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};
