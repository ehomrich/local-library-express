const mongoose = require('mongoose');

const BookInstance = mongoose.model('BookInstance');

exports.list = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance list');
};

exports.detail = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

exports.create_get = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

exports.create_post = (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};

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
