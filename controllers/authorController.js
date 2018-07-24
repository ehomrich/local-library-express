const mongoose = require('mongoose');

const Author = mongoose.model('Author');

exports.list = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author list');
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
