/* --- HTML Content String --- */
var Login = '<div id="loginScreen" class="container-fluid"><label>User Name:</label><input id="username" type="text" onchange="validateData()"/><button id="myBtn" onclick="authenticate()">Login</button></div><div id="mainScreen"><h3 id="message">Please Login</h3><button onclick="logout()">Logout</button></div>';
  
//1. Insert HTML content
document.body.insertAdjacentHTML("afterbegin", Login);

/* --- Global Variables --- */
var sUserName, targetElementMessage, targetElementLogin, targetElementMain, targetElementBtn, targetElementInput;

/* --- DOM Content Loaded Setup --- */
document.addEventListener("DOMContentLoaded", function(e) {
   // Assign global variables to DOM elements (done after insertion)
  // Check for stored login state
  // Initialize button state when the page loads
	targetElementLogin = document.getElementById("loginScreen");
	targetElementMain = document.getElementById("mainScreen");
	targetElementMessage = document.getElementById("message");
	targetElementBtn = document.getElementById("myBtn");
	targetElementInput = document.getElementById("username");
 
	  checkLoginStatus(); 
	  
	  if (targetElementInput) {
		targetElementBtn.disabled = true;
	  }
	});
	
	
		function validateData(){
    //simple regex pattern for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    // Get the current value
    sUserName = targetElementInput.value;
		
    // Test if the current value matches the email pattern
    if(emailPattern.test(sUserName)){
        // If it looks like an email, enable the button
        targetElementBtn.disabled = false;
    } else {
        // If it does not look like an email, disable the button
        targetElementBtn.disabled = true;
    }
}
 
// Check if the username is stored in localStorage
function checkLoginStatus() {
  
  const storedUsername = localStorage.getItem('username');
  
  if (storedUsername) {
      sUserName = storedUsername; 
      targetElementMessage.innerHTML = "You are logged in as, " + sUserName + "!";
      targetElementLogin.style.display = "none";
      targetElementMain.style.display = "block";
  } else {
      targetElementLogin.style.display = "block";
      targetElementMain.style.display = "none";
  }
}




function authenticate(){
    
    const currentUserName = targetElementInput.value; 
	if (currentUserName.length <= 2) {
		   alert("Please enter a username longer than 2 characters.");
			return; 
		}
  
	  // 1. Get the latest value directly from the input element
     // 2. Validate the value (Safety check)
    // 3. Update the global variable
   // 4. Save the username to localStorage
  // 5. Perform UI update on the message element
 // 6. Hide the login screen, but ONLY if the element exists
// 7. Show the main screen, but ONLY if the element exists
  
    sUserName = currentUserName;
    localStorage.setItem('username', sUserName); 

      
    if (targetElementMessage) {
        targetElementMessage.innerHTML = "Hello " + sUserName + ", you are authenticated";
    }

    
    if (targetElementLogin) {
        targetElementLogin.style.display = "none";
    }
    
    
    if (targetElementMain) {
        targetElementMain.style.display = "block";
    }
}

function logout(){
    // 1. Remove the username from localStorage
    // 2. Clear the input field for the next login attempt
   // 3. Perform UI update
   // Reset the welcome message
    localStorage.removeItem('username'); 
    targetElementInput.value = ""; 
    targetElementLogin.style.display = "block";
    targetElementMain.style.display = "none";
    targetElementBtn.disabled = true;

    
    targetElementMessage.innerHTML = "Please Login";
}