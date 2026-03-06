/* ====================== */
/* TAB SYSTEM */
/* ====================== */

function openAdminTab(id){

document.querySelectorAll(".admin-tab").forEach(tab=>{
tab.style.display="none";
});

document.getElementById(id).style.display="block";

}


/* ====================== */
/* DASHBOARD STATS */
/* ====================== */

function loadStats(){

const users = JSON.parse(localStorage.getItem("users")) || [];
const properties = JSON.parse(localStorage.getItem("ownerProperties")) || [];
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

document.getElementById("totalUsers").innerText = users.length;
document.getElementById("totalProperties").innerText = properties.length;
document.getElementById("totalBookings").innerText = bookings.length;

}


/* ====================== */
/* USERS */
/* ====================== */

function loadUsers(){

const users = JSON.parse(localStorage.getItem("users")) || [];
const table = document.getElementById("usersTable");

table.innerHTML="";

users.forEach(u=>{

table.innerHTML += `

<tr>

<td>${u.id}</td>
<td>${u.name}</td>
<td>${u.email}</td>
<td>${u.type}</td>
<td>${u.owner ? "Yes":"No"}</td>

<td>

<button onclick="grantOwner(${u.id})">Grant</button>

<button onclick="removeOwner(${u.id})">Remove</button>

<button onclick="deleteUser(${u.id})">Delete</button>

</td>

</tr>

`;

});

}


function grantOwner(id){

let users = JSON.parse(localStorage.getItem("users"));

users.forEach(u=>{
if(u.id==id){
u.owner=true;
u.type="Owner";
}
});

localStorage.setItem("users",JSON.stringify(users));

loadUsers();

}


function removeOwner(id){

let users = JSON.parse(localStorage.getItem("users"));

users.forEach(u=>{
if(u.id==id){
u.owner=false;
u.type="Renter";
}
});

localStorage.setItem("users",JSON.stringify(users));

loadUsers();

}


function deleteUser(id){

let users = JSON.parse(localStorage.getItem("users"));

users = users.filter(u=>u.id!=id);

localStorage.setItem("users",JSON.stringify(users));

loadUsers();

loadStats();

}


/* ====================== */
/* PROPERTIES */
/* ====================== */

function loadProperties(){

const properties = JSON.parse(localStorage.getItem("ownerProperties")) || [];
const table = document.getElementById("propertiesTable");

table.innerHTML="";

properties.forEach(p=>{

table.innerHTML += `

<tr>

<td>${p.id}</td>
<td>${p.ownerId}</td>
<td>${p.propertyType}</td>
<td>${p.adType}</td>
<td>${p.address}</td>
<td>${p.ownerContact}</td>
<td>₹${p.amount}</td>
<td>${p.status}</td>

<td>
<button onclick="deleteProperty(${p.id})">Delete</button>
</td>

</tr>

`;

});

}


function deleteProperty(id){

let properties = JSON.parse(localStorage.getItem("ownerProperties"));

properties = properties.filter(p=>p.id!=id);

localStorage.setItem("ownerProperties",JSON.stringify(properties));

loadProperties();

loadStats();

}


/* ====================== */
/* BOOKINGS */
/* ====================== */

function loadBookings(){

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const table = document.getElementById("bookingsTable");

table.innerHTML="";

bookings.forEach(b=>{

table.innerHTML += `

<tr>

<td>${b.bookingId}</td>
<td>${b.ownerId}</td>
<td>${b.propertyId}</td>
<td>${b.tenantId}</td>
<td>${b.tenantName}</td>
<td>${b.status}</td>

<td>

<button onclick="approveBooking(${b.bookingId})">Approve</button>

<button onclick="rejectBooking(${b.bookingId})">Reject</button>

<button onclick="deleteBooking(${b.bookingId})">Delete</button>

</td>

</tr>

`;

});

}


function approveBooking(id){

let bookings = JSON.parse(localStorage.getItem("bookings"));

bookings.forEach(b=>{
if(b.bookingId==id){
b.status="Approved";
}
});

localStorage.setItem("bookings",JSON.stringify(bookings));

loadBookings();

}


function rejectBooking(id){

let bookings = JSON.parse(localStorage.getItem("bookings"));

bookings.forEach(b=>{
if(b.bookingId==id){
b.status="Rejected";
}
});

localStorage.setItem("bookings",JSON.stringify(bookings));

loadBookings();

}


function deleteBooking(id){

let bookings = JSON.parse(localStorage.getItem("bookings"));

bookings = bookings.filter(b=>b.bookingId!=id);

localStorage.setItem("bookings",JSON.stringify(bookings));

loadBookings();

loadStats();

}


/* ====================== */
/* INIT */
/* ====================== */

document.addEventListener("DOMContentLoaded",()=>{

openAdminTab("usersTab");

loadStats();

loadUsers();

loadProperties();

loadBookings();

});