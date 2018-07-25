const Author = require('../models/author');
const Book = require('../models/book');

const async = require('async');

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
    res.send('NOT IMPLEMENTED: Author create GET');
};

exports.create_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author create POST');
};

exports.delete_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

exports.delete_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

exports.update_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update GET');
};

exports.update_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update POST');
};
