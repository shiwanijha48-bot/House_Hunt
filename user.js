function checkLogin(){

const user = JSON.parse(localStorage.getItem("loggedUser"));

const loginNav = document.getElementById("loginNav");
const userNav = document.getElementById("userNav");

if(user){

if(loginNav) loginNav.style.display="none";

if(userNav) userNav.style.display="flex";

const nameBox=document.getElementById("userName");

if(nameBox){
nameBox.innerText="👤 "+user.name;
}

/* AUTO BOOK PROPERTY AFTER LOGIN */

const selectedProperty=localStorage.getItem("selectedProperty");

if(selectedProperty){

let bookings=JSON.parse(localStorage.getItem("bookings")) || [];

const booking={

bookingId:"BK"+Date.now(),

propertyId:selectedProperty,

tenant:user.name,

phone:user.phone,

status:"Pending"

};

bookings.push(booking);

localStorage.setItem("bookings",JSON.stringify(bookings));

localStorage.removeItem("selectedProperty");

alert("Property Booked Successfully!");

}

}

}


/* LOGOUT */

function logoutUser(){

localStorage.removeItem("loggedUser");

alert("Logged Out Successfully");

window.location.href="index.html";

}


/* PAGE LOAD */

checkLogin();