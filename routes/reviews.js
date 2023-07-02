const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, catchAsync(reviews.newReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;