/* --- HTML Content String --- */
var Login = '<div id="loginScreen" class="container-fluid"><label>User Name:</label><input id="username" type="text" onchange="authenticate()"/><button id="myBtn" onclick="authenticate()">Login</button></div><div id="mainScreen"><h3 id="message">Please Login</h3><button onclick="logout()">Logout</button></div>';
  
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




function authenticate() {
    // 1. Get the value directly from the input (CORRECTED)
    // 2. Extra Safety Check: If somehow an invalid email got here, stop.	
	 // 3. Save to storage (Replaced 'currentUserName' with 'sUserName')
	// 4. Update the Message
	// 5. Hide Login Screen
	// 6. Show Main Screen
	
	
	
	sUserName = targetElementInput.value;
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(sUserName)) {
        alert("Please enter a valid email first.");
        return; // This stops the function if email is bad
    }
  
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