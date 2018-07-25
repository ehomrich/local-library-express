const Genre = require('../models/genre');
const Book = require('../models/book');

const async = require('async');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.list = (req, res, next) => {
    Genre.find()
        .sort([['name', 'ascending']])
        .exec((err, genresList) => {
            if (err) {
                return next(err);
            }

            res.render('genre_list', { title: 'Genre list', genresList: genresList });
        });
};

exports.detail = (req, res, next) => {
    async.parallel(
        {
            genre: callback => {
                Genre.findById(req.params.id).exec(callback);
            },
            genreBooks: callback => {
                Book.find({ genre: req.params.id }).exec(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }

            if (results.genre == null) {
                const err = new Error('Genre not found');
                err.status = 404;

                return next(err);
            }

            res.render('genre_detail', {
                title: 'Genre detail',
                genre: results.genre,
                genreBooks: results.genreBooks
            });
        }
    );
};

exports.create_get = (req, res, next) => {
    res.render('genre_form', { title: 'Create genre' });
};

exports.create_post = [
    body('name', 'Genre name required')
        .isLength({ min: 1 })
        .trim(),
    sanitizeBody('name')
        .trim()
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var genre = new Genre({ name: req.body.name });

        if (!errors.isEmpty()) {
            res.render('genre_form', {
                title: 'Create genre',
                genre: genre,
                errors: errors.array()
            });

            return;
        } else {
            Genre.findOne({ name: req.body.name }).exec(function (err, foundGenre) {
                if (err) {
                    return next(err);
                }

                if (foundGenre) {
                    res.redirect(foundGenre.url);
                } else {
                    genre.save(function (err) {
                        if (err) {
                            return next(err);
                        }

                        res.redirect(genre.url);
                    });
                }
            });
        }
    }
];

exports.delete_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

exports.delete_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

exports.update_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

exports.update_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
