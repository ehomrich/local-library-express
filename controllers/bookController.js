const mongoose = require('mongoose');

const Book = mongoose.model('Book');

exports.index = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.list = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book list');
};

exports.detail = (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
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