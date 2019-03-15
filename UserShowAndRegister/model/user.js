var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	login: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password:{
		type: String,
		required: true,
	}
});

// hash the password
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.pre('save', function (next) {
	this.password = this.generateHash(this.password);
	next();
});

var User = mongoose.model('user', userSchema);
module.exports = User;