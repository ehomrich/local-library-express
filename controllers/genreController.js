const Genre = require('../models/genre');

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
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
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
