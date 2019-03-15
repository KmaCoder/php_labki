var express = require('express');
var router = express.Router();

var User = require('../model/user');


router.get('/', function(req, res, next) {
  User.find().exec(function (err, data) {
    if (err)
      return callback(err);
    return res.render('index', {title: 'Oleckii labki', users: data});
  });
});

module.exports = router;
