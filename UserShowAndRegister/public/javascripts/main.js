$(function () {
	const $formEmails = $(".form-emails");

	$formEmails.submit(function (e) {
		e.preventDefault();

		var $form = $(this);

		$.ajax({
			url: "/users/sendEmails",
			type: 'post',
			data: $form.serialize(),
			success: function () {
				alert("Emails sent successfully");
				$form[0].reset();
			},
			error: function (err) {
				console.log(err);
				onError("Something went wrong");
			}
		});
	});


	const $formRegister = $(".form-user");

	$formRegister.submit(function (e) {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		var $form = $(this);

		$.ajax({
			url: "/users/registerUser",
			type: 'post',
			data: $form.serialize(),
			success: function (data) {
				$('.table-users').append(`<tr><td>${data.user.email}</td><td>${data.user.login}</td></tr>`);
				$form[0].reset();
				alert("New user added successfully!");
			},
			error: function (data) {
				onError("ERROR\n" + data.responseJSON.message.errmsg);
			}
		});
	});

	function onError(msg) {
		alert(msg);
	}

	function validate() {
		var $email = $formRegister.find('input[name=email]');
		var $login = $formRegister.find('input[name=login]');
		var $pass1 = $formRegister.find('input[name=password]');
		var $pass2 = $formRegister.find('input[name=password_confirm]');

		var validData = true;

		if(!validateEmail($email.val())) {
			setInvalid($email, "Please enter valid email");
			validData = false;
		} else {
			setValid($email);
		}

		if(!validateLogin($login.val())) {
			setInvalid($login, "Login must have at least 5 symbols");
			validData = false;
		} else {
			setValid($login);
		}

		if(!validatePassword($pass1.val())) {
			setInvalid($pass1, "Password must have at least 8 symbols");
			validData = false;
		} else {
			setValid($pass1);
		}

		if ($pass1.val() !== $pass2.val()) {
			setInvalid($pass2, "Passwords must match");
			validData = false;
		} else {
			setValid($pass2);
		}

		return validData;
	}

	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function validatePassword(pass) {
		return pass.length >= 8;
	}

	function validateLogin(login) {
		return login.length >= 5;
	}

	function setValid($elem) {
		$elem.removeClass('invalid');
	}

	function setInvalid($elem, message='') {
		$elem.addClass('invalid');
		$formRegister.find(`label[for=${$elem.attr('name')}]`).text(message);
	}
});