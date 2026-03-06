/* TAB SYSTEM */

function openRenterTab(id){

document.querySelectorAll(".renter-tab").forEach(tab=>{
tab.style.display="none";
});

document.getElementById(id).style.display="block";

}

openRenterTab("browseTab");


/* TOAST POPUP */

function showToast(msg){

const toast=document.createElement("div");
toast.className="toast";
toast.innerText=msg;

document.body.appendChild(toast);

setTimeout(()=>{
toast.classList.add("show");
},100);

setTimeout(()=>{
toast.classList.remove("show");

setTimeout(()=>{
toast.remove();
},400);

},2500);

}


/* LOAD PROPERTIES */

function loadProperties(list=properties){

const container=document.getElementById("propertyContainer");

if(!container) return;

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="property-card">

<img src="${p.image}">

<h3>${p.title}</h3>

<p>📍 ${p.location}</p>

<p>🏠 ${p.rooms} BHK</p>

<p class="price">₹${p.price.toLocaleString()}</p>

<div class="property-buttons">

<button onclick="viewDetails(${p.id})">
View Details
</button>

<button onclick="bookProperty(${p.id})">
Book Property
</button>

</div>

</div>

`;

});

}


/* VIEW DETAILS */

function viewDetails(id){

window.location.href="property.html?id="+id;

}


/* FILTER */

function filterProperties(){

const address=document.getElementById("searchAddress").value.toLowerCase();

const type=document.getElementById("typeFilter").value;

let filtered=properties.filter(p=>{

return(

p.location.toLowerCase().includes(address) &&
(type==="" || p.type===type)

);

});

loadProperties(filtered);

}


/* BOOK PROPERTY */

function bookProperty(id){

const user=JSON.parse(localStorage.getItem("loggedUser"));

/* NOT LOGGED */

if(!user){

localStorage.setItem("selectedProperty",id);

showToast("Please login first");

setTimeout(()=>{
window.location.href="login.html";
},1200);

return;

}


/* ALREADY LOGGED */

let bookings=JSON.parse(localStorage.getItem("bookings")) || [];

const exists=bookings.find(b=>b.propertyId==id && b.phone==user.phone);

if(exists){

showToast("You already booked this property");

return;

}

const booking={

bookingId:"BK"+Date.now(),

propertyId:id,

tenant:user.name,

phone:user.phone,

status:"Pending"

};

bookings.push(booking);

localStorage.setItem("bookings",JSON.stringify(bookings));

showToast("Booking successful!");

loadBookings();

}


/* LOAD BOOKINGS */

function loadBookings(){

const table=document.getElementById("bookingTable");

if(!table) return;

table.innerHTML="";

let bookings=JSON.parse(localStorage.getItem("bookings")) || [];

const user=JSON.parse(localStorage.getItem("loggedUser"));

if(user){

bookings=bookings.filter(b=>b.phone===user.phone);

}

bookings.forEach(b=>{

table.innerHTML+=`

<tr>

<td>${b.bookingId}</td>
<td>${b.propertyId}</td>
<td>${b.tenant}</td>
<td>${b.phone}</td>
<td>${b.status}</td>

</tr>

`;

});

}


/* LOAD PAGE */

document.addEventListener("DOMContentLoaded",()=>{

loadProperties();
loadBookings();

});