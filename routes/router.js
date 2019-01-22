const express = require('express');
const router = express.Router();
const anagrams = require('../labsFiles/anagrams');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/anagrams', function(req, res, next) {
  let data = anagrams();
  res.render('anagrams', { title: 'Anagrams', data: data});
});


module.exports = router;
