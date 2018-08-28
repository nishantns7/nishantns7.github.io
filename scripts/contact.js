var valid = false;

function validateFirst() {
	var fname = document.getElementById('fname');
	if (fname.value === "") {
		document.getElementById('invalidFirst').innerHTML = "Invalid first name";
		valid = false;
	} else {
		document.getElementById('invalidFirst').innerHTML = "<br>";
		valid = true;
	}
}

function validateLast() {
	var lname = document.getElementById('lname');
	if (lname.value === "") {
		document.getElementById('invalidLast').innerHTML = "Invalid last name";
		valid = false;
	} else {
		document.getElementById('invalidLast').innerHTML = "<br>";
		valid = true;
	}
}

function validateEmail() {
	var email = document.getElementById('email');
	if (email.value === "" || !(email.value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/))) {
		document.getElementById('invalidEmail').innerHTML = "Invalid email";
		valid = false;
	} else {
		document.getElementById('invalidEmail').innerHTML = "<br>";
		valid = true;
	}
}

function validateMessage() {
	var message = document.getElementById('message');
	if (message.value === "") {
		document.getElementById('invalidMessage').innerHTML = "Message cannot be empty";
		valid = false;
	} else {
		document.getElementById('invalidMessage').innerHTML = "<br>";
		valid = true;
	}
}