const express = require('express');
const router = express.Router();
const path = require('path');

// define routes
// ex: this route must begin (^) with a / and end ($) with a /
// or index.html
// regex: index(.html)? => make .html optional
router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});


module.exports = router;