// andrei form validation script

// call these functions as soon as the page is open script initialized
insert_pop_up();
check_log_in_status(localStorage.getItem('user'));


// sneakily inser tsome html into the page and hide it completely
function insert_pop_up() {
	// this html code has been borrowed from geeksforgeeks.org and class/id names have been modified to match mine
	// https://www.geeksforgeeks.org/javascript/how-to-open-a-popup-on-click-using-javascript/
	var pop_up_html = `
		<div id="overlay" onclick="hide_pop_up();"></div>
		<div class="pop_up font-jb" id="pop_up">
			<label for="ag_username">Username:</label>
			<br>
			<input type="text" id="ag_username_l" name="ag_username" placeholder="Enter your username" size="27">
			<br>

			<label for="ag_passwd">Password:</label>
			<br>
			<input type="password" id="ag_passwd_l" name="ag_passwd_l" placeholder="passsword" size="27">
			<br>
			<span id="login_error" class="error_message"></span>
			<br>
			<div class="ag_center">
				<button onclick="log_in();" id="logged_out">Log in</button>
				<button onclick="log_out();" id="logged_in">Log out</button>
			</div>
			<br>
			<div class="ag_center">
				<button type="reset" onclick="hide_pop_up();">Cancel</button>
			</div>
		</div>
		`;

	// this javascript method has been heavily inspired by DivyashC's answer on stack overflow
	// https://stackoverflow.com/a/71291396
	document.body.insertAdjacentHTML("afterbegin", pop_up_html);
	hide_pop_up();
}


// make the login screen disappear
function hide_pop_up() {
	document.getElementById("overlay").style.display = "none";
	document.getElementById("pop_up").style.display = "none";

	reset_log_in_error();
}


// make the login screen appear
function pop_up() {
	document.getElementById("overlay").style.display = "block";
	document.getElementById("pop_up").style.display = "block";
}


// get values of all inputs and make sure they meet the requirements, if not raise an error
// this fucntion has been inspired by our lecturer's (Emer) sample formVAlidation() {}; function code for our web design lecture
// the code has been heavily modified to use different class/id/function/method names and differend conditionals and operators
// https://moodle2025.ncirl.ie/mod/folder/view.php?id=32568
function validate_form() {
	const username = document.getElementById("ag_username").value;
	const fname = document.getElementById("ag_fname").value;
	const lname = document.getElementById("ag_lname").value;
	const occupation = document.getElementById("ag_occupation").value;
	const email = document.getElementById("ag_email").value;
	const date = document.getElementById("ag_date").value;
	const passwd = document.getElementById("ag_passwd").value;
	const rpasswd = document.getElementById("ag_rpasswd").value;
	const agree = document.getElementById("ag_agree").checked;

	const username_error = document.getElementById("username_error");
	const fname_error = document.getElementById("fname_error");
	const lname_error = document.getElementById("lname_error");
	const occupation_error = document.getElementById("occupation_error");
	const email_error = document.getElementById("email_error");
	const date_error = document.getElementById("date_error");
	const passwd_error = document.getElementById("passwd_error");
	const rpasswd_error = document.getElementById("rpasswd_error");
	const agree_error = document.getElementById("agree_error");

	reset_error();

	let form_validity = true;

	if (username == "" || username.length < 3) {
		username_error.textContent = "Please enter a valid username.";
		form_validity = false;
	}

	if (fname == "" || fname.length < 3) {
		fname_error.textContent = "Please enter a valid name.";
		form_validity = false;
	}

	if (lname == "" || lname.length < 3) {
		lname_error.textContent = "Please enter a valid surname.";
		form_validity = false;
	}

	if (occupation == "") {
		occupation_error.textContent = "Please choose a occupation.";
		form_validity = false;
	}

	if (!email.includes("@") || !email.includes(".")) {
		email_error.textContent = "Please enter a valid email address.";
		form_validity = false;
	}

	if (date == "") {
		date_error.textContent = "Please choose a valid date of birth.";
		form_validity = false;
	}

	if (passwd == "" || passwd.length < 6) {
		passwd_error.textContent = "Please enter a valid password.";
		form_validity = false;
	}

	if (rpasswd != passwd) {
		rpasswd_error.textContent = "Passwords don't match.";
		form_validity = false;
	}

	if (!agree) {
		agree_error.textContent = "Please agree to the terms and conditions.";
		form_validity = false;
	}

	if (form_validity) {
		// save_data();
		localStorage.setItem('user', username);
		localStorage.setItem('password', passwd);

		alert("Your account has been created! \n\nYou can now log in with your username and password.")
		return true;
	} else {
		return false;
	}
}


// obsolete (failed attempt)
function hide_error() {
	// const error_list = ["error_message01", "error_message02", "error_message03",
	// 					"error_message04", "error_message05", "error_message06",
	// 					"error_message07", "error_message08", "error_message09"];
	const error_list = ["username_error", "fname_error", "lname_error",
						"occupation_error", "email_error", "date_error",
						"passwd_error", "rpasswd_error", "agree_error"];

	for (let i = 0; i < error_list.length; ++i) {
		document.getElementById(error_list[i]).style.display = "none";
		// error_list[i].textContent = "";
	}
}


// sel all errors to be empty fiels (invisible)
function reset_error() {
	username_error.textContent = "";
	fname_error.textContent = "";
	lname_error.textContent = "";
	occupation_error.textContent = "";
	email_error.textContent = "";
	date_error.textContent = "";
	passwd_error.textContent = "";
	rpasswd_error.textContent = "";
	agree_error.textContent = "";
}


// get value from the inputs and make sure they match the values stored in the database
function log_in() {
	const login_error = document.getElementById("login_error");

	var user = localStorage.getItem('user');
	var password = localStorage.getItem('password');

	var user_login = document.getElementById("ag_username_l").value;
	var password_login = document.getElementById("ag_passwd_l").value;

	if (user_login == user && password_login == password) {
		// persistent log in
		localStorage.setItem('log_in_status', true);

		// document.getElementById("ag_loginBtn").textContent = user;
		check_log_in_status(user);
		hide_pop_up();

		logged_in();
		alert("log in succesful");
	} else {
		login_error.textContent = "Username or password is wrong.";
	}
}


// set log error to be empty field (invisible)
function reset_log_in_error() {
	login_error.textContent = "";
}


// if the log in status is true make sure the username is disabled
function check_log_in_status(user) {
	if (localStorage.getItem('log_in_status') == "true") {
		document.getElementById("ag_loginBtn").textContent = user;

		logged_in();
	} else {
		document.getElementById("ag_loginBtn").textContent = "Log in";

		log_out();
	}
}


// disable login pop up buttons
function log_out() {
	localStorage.setItem('log_in_status', false);
	// check_log_in_status(localStorage.getItem('user'));
	document.getElementById("ag_loginBtn").textContent = "Log in";

	document.getElementById("logged_in").disabled = true;
	document.getElementById("logged_out").disabled = false;
	document.getElementById("ag_username_l").disabled = false;
	document.getElementById("ag_passwd_l").disabled = false;
}


// disable login pop up buttons
function logged_in() {
	document.getElementById("logged_out").disabled = true;
	document.getElementById("ag_username_l").disabled = true;
	document.getElementById("ag_passwd_l").disabled = true;
	document.getElementById("logged_in").disabled = false;

	reset_log_in_error();
}
