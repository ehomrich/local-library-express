const Author = require('../models/author');

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
    res.send('NOT IMPLEMENTED: Author detail');
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
