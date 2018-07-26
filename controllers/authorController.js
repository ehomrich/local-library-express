const Author = require('../models/author');
const Book = require('../models/book');

const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.list = (req, res, next) => {
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec((err, authorsList) => {
            if (err) {
                return next(err);
            }

            res.render('author_list', {
                title: 'Author list',
                authorsList: authorsList
            });
        });
};

exports.detail = (req, res, next) => {
    async.parallel(
        {
            author: callback => {
                Author.findById(req.params.id).exec(callback);
            },
            authorBooks: callback => {
                Book.find({ author: req.params.id }, 'title summary').exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.author == null) {
                const err = new Error('Author not found');
                err.status = 404;

                return next(err);
            }

            res.render('author_detail', {
                title: 'Author detail',
                author: results.author,
                authorBooks: results.authorBooks
            });
        }
    );
};

exports.create_get = (req, res, next) => {
    res.render('author_form', { title: 'Create author' });
};

exports.create_post = [
    body('first_name')
        .isLength({ min: 1 })
        .trim()
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('family_name')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Family name must be specified.')
        .isAlphanumeric()
        .withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth')
        .optional({ checkFalsy: true })
        .isISO8601(),
    body('date_of_death', 'Invalid date of death')
        .optional({ checkFalsy: true })
        .isISO8601(),

    sanitizeBody('first_name')
        .trim()
        .escape(),
    sanitizeBody('family_name')
        .trim()
        .escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('author_form', {
                title: 'Create author',
                errors: errors.array()
            });

            return;
        } else {
            const author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });

            author.save(err => {
                if (err) {
                    return next(err);
                }

                res.redirect(author.url);
            });
        }
    }
];

exports.delete_get = (req, res, next) => {
    async.parallel(
        {
            author: callback => {
                Author.findById(req.params.id).exec(callback);
            },
            books: callback => {
                Book.find({ author: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.author == null) {
                res.redirect('/catalog/authors');
            }

            res.render('author_delete', {
                title: 'Delete author',
                author: results.author,
                books: results.books
            });
        }
    );
};

exports.delete_post = (req, res, next) => {
    async.parallel(
        {
            author: callback => {
                Author.findById(req.params.id).exec(callback);
            },
            books: callback => {
                Book.find({ author: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.books.length) {
                res.render('author_delete', {
                    title: 'Delete author',
                    author: results.author,
                    books: results.books
                });
            } else {
                Author.findByIdAndRemove(req.body.authorid, function deleteAuthor (err) {
                    if (err) {
                        return next(err);
                    }

                    res.redirect('/catalog/authors');
                });
            }
        }
    );
};

exports.update_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update GET');
};

exports.update_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update POST');
};
