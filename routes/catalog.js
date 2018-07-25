const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const bookinstanceController = require('../controllers/bookinstanceController');

/**
 * Book routes
 */
router.get('/', bookController.index);
router.get('/books/create', bookController.create_get);
router.post('/books/create', bookController.create_post);
router.get('/books/:id/delete', bookController.delete_get);
router.post('/books/:id/delete', bookController.delete_post);
router.get('/books/:id/update', bookController.update_get);
router.post('/books/:id/update', bookController.update_post);
router.get('/books/:id', bookController.detail);
router.get('/books', bookController.list);

/**
 * Author routes
 */
router.get('/authors/create', authorController.create_get);
router.post('/authors/create', authorController.create_post);
router.get('/authors/:id/delete', authorController.delete_get);
router.post('/authors/:id/delete', authorController.delete_post);
router.get('/authors/:id/update', authorController.update_get);
router.post('/authors/:id/update', authorController.update_post);
router.get('/authors/:id', authorController.detail);
router.get('/authors', authorController.list);

/**
 * Genre routes
 */
router.get('/genres/create', genreController.create_get);
router.post('/genres/create', genreController.create_post);
router.get('/genres/:id/delete', genreController.delete_get);
router.post('/genres/:id/delete', genreController.delete_post);
router.get('/genres/:id/update', genreController.update_get);
router.post('/genres/:id/update', genreController.update_post);
router.get('/genres/:id', genreController.detail);
router.get('/genres', genreController.list);

/**
 * Book instance routes
 */
router.get('/book-instances/create', bookinstanceController.create_get);
router.post('/book-instances/create', bookinstanceController.create_post);
router.get('/book-instances/:id/delete', bookinstanceController.delete_get);
router.post('/book-instances/:id/delete', bookinstanceController.delete_post);
router.get('/book-instances/:id/update', bookinstanceController.update_get);
router.post('/book-instances/:id/update', bookinstanceController.update_post);
router.get('/book-instances/:id', bookinstanceController.detail);
router.get('/book-instances', bookinstanceController.list);

module.exports = router;