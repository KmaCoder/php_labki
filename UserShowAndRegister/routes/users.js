var express = require('express');
var router = express.Router();

var User = require('../model/user');

/* GET users listing. */
router.post('/registerUser', function (req, res, next) {
	var userConfig = {
		email: req.body['email'],
		login: req.body['login'],
		password: req.body['password'],
		confirmPassword: req.body['password_confirm']
	};

	var new_user = new User(userConfig);
	new_user.save(function (err, user) {
		if (err) {
			res.status(400).send({
				success: false,
				message: err
			});
			return;
		}
		res.send({
			success: true,
			user: {
				login: user.login,
				email: user.email
			}
		});
	});
});

let nodemailer = require('nodemailer').createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'kmacoder4110@gmail.com',
		pass: 'wRF9VDXyHr7m9jS'
	}
});

router.post('/sendEmails', function (req, res, next) {
	User.find().exec(function (err, data) {
		if (err) {
			res.status(400).send({
				success: false,
				message: err
			});
			return;
		}

		const emails = data
			.reduce(function (result, user) {
				return result + user.email + ','
			},'')
			.slice(0, -1);

		const mailOptions = {
			from: 'kmacoder4110@gmail.com',
			to: emails,
			subject: 'Spam email',
			text: req.body['message']
		};


		nodemailer.sendMail(mailOptions, function (error, info) {
			if (error) {
				res.status(400).send({
					success: false,
					message: error
				});
			} else {
				res.send({
					success: true
				});
			}
		});
	});
});

module.exports = router;
