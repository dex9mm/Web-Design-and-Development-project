// Tristan's form validation

//when validForm() is called , it will validate each constant
function validForm() {
	const names = document.getElementById("names").value;              
	const surname = document.getElementById("surname").value;
	const email = document.getElementById("email").value;
	const suggest = document.getElementById("suggest").value;
	
	// this is used for detect any errors
	const name_Err = document.getElementById("names_error");
	const surn_Err = document.getElementById("surname_error");
	const email_Err = document.getElementById("email_error");
	const sug_Err = document.getElementById("sug_error");
	
	//this is used to make sure the field is not left empty
	name_Err.textContent = "";
	surn_Err.textContent = "";
	email_Err.textContent = "";
	sug_Err.textContent = "";

	var is_form_valid = true;
	
	//length check for names box
	if(names === "" || names.length < 2){
		name_Err.textContent = "Please eneter your name correctly";
		is_form_valid = false;
	}
	
	//length check for surname box
	if(surname === "" || surname.length < 2){
		surn_Err.textContent = "Please eneter your surname correctly";
		is_form_valid = false;
	}
	
	//length check for email box
	if(email === "" || email.length < 5){
		email_Err.textContent = "Please eneter a valid Email";
		is_form_valid = false;
	}
	
	//length check for suggestion box
	if(suggest === "" || suggest.length < 10){
		sug_Err.textContent = "Please eneter a suggestion";
		is_form_valid = false;
	}
	
	//if the is_form_valid remains true , they alert is displayed
	if(is_form_valid){
		alert("Form submitted successfuly");
		return true;
	}else{
		return false;
	}

}