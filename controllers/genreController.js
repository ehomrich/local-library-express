const Genre = require('../models/genre');
const Book = require('../models/book');

const async = require('async');

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
    res.send('NOT IMPLEMENTED: Genre create GET');
};

exports.create_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

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
