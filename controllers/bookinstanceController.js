const BookInstance = require('../models/bookinstance');

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
