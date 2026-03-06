function showSignup(){

document.querySelector(".form-box").classList.add("hidden");
document.getElementById("signupBox").classList.remove("hidden");

}

function showLogin(){

document.querySelector(".form-box").classList.remove("hidden");
document.getElementById("signupBox").classList.add("hidden");

}

// 
message.innerText = "✅ Login successful! Redirecting...";
// 

/* SIGNUP */

function signupUser(){

const name = document.getElementById("signupName").value;
const email = document.getElementById("signupEmail").value;
const phone = document.getElementById("signupPhone").value;
const password = document.getElementById("signupPassword").value;
const confirm = document.getElementById("signupConfirm").value;

const message = document.getElementById("signupMessage");


if(password !== confirm){

message.innerText = "Passwords do not match!";
return;

}

let users = JSON.parse(localStorage.getItem("users")) || [];

const exists = users.find(user => user.email === email);

if(exists){

message.innerText = "User already exists!";
return;

}

users.push({
name,
email,
phone,
password
});

localStorage.setItem("users", JSON.stringify(users));

message.innerText = "Account created successfully!";

setTimeout(()=>{

showLogin();

},1500);

}



/* LOGIN */

function loginUser(){

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

const message = document.getElementById("loginMessage");

let users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(u => u.email === email);

if(!user){

message.innerText = "User does not exist!";
return;

}

if(user.password !== password){

message.innerText = "Incorrect password!";
return;

}

localStorage.setItem("loggedUser", JSON.stringify(user));

message.innerText = "Login successful!";

setTimeout(()=>{

window.location.href="index.html";

},1200);

}