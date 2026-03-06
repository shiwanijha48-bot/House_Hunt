/* ============================= */
/* OWNER TABS */
/* ============================= */

function openOwnerTab(id){

document.querySelectorAll(".owner-tab").forEach(tab=>{
tab.style.display="none";
});

document.getElementById(id).style.display="block";

}


/* ============================= */
/* ADD PROPERTY */
/* ============================= */

function addProperty(){

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if(!loggedUser){
alert("Please login first");
window.location.href="login.html";
return;
}

const type=document.getElementById("ptype").value;
const adtype=document.getElementById("adtype").value;
const address=document.getElementById("address").value;
const contact=document.getElementById("contact").value;
const price=document.getElementById("price").value;
const details=document.getElementById("details").value;

if(address==="" || contact==="" || price===""){
alert("Please fill all fields");
return;
}

const property={

id:Date.now(),

ownerId:loggedUser.id,
ownerName:loggedUser.name,
ownerContact:contact,

propertyType:type,
adType:adtype,

address:address,
amount:Number(price),

description:details,

status:"Available"

};

let stored=JSON.parse(localStorage.getItem("ownerProperties")) || [];

stored.push(property);

localStorage.setItem("ownerProperties",JSON.stringify(stored));

alert("Property Added Successfully");

document.getElementById("address").value="";
document.getElementById("contact").value="";
document.getElementById("price").value="";
document.getElementById("details").value="";

loadOwnerProperties();

openOwnerTab("allProperties");

}


/* ============================= */
/* LOAD OWNER PROPERTIES */
/* ============================= */

function loadOwnerProperties(){

const table=document.getElementById("ownerPropertyTable");

if(!table) return;

table.innerHTML="";

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

let stored=JSON.parse(localStorage.getItem("ownerProperties")) || [];

/* only show owner's properties */

stored = stored.filter(p=>p.ownerId === loggedUser.id);

if(stored.length===0){
table.innerHTML=`<tr><td colspan="8">No Properties Added</td></tr>`;
return;
}

stored.forEach(p=>{

table.innerHTML+=`

<tr>

<td>${p.id}</td>
<td>${p.propertyType}</td>
<td>${p.adType}</td>
<td>${p.address}</td>
<td>${p.ownerContact}</td>
<td>₹${p.amount}</td>
<td>${p.status}</td>

<td>
<button onclick="deleteProperty(${p.id})">
Delete
</button>
</td>

</tr>

`;

});

}


/* ============================= */
/* DELETE PROPERTY */
/* ============================= */

function deleteProperty(id){

let stored=JSON.parse(localStorage.getItem("ownerProperties")) || [];

stored=stored.filter(p=>p.id!==id);

localStorage.setItem("ownerProperties",JSON.stringify(stored));

loadOwnerProperties();

}


/* ============================= */
/* LOAD BOOKINGS */
/* ============================= */

function loadBookings(){

const table=document.getElementById("bookingTable");

if(!table) return;

table.innerHTML="";

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

let bookings=JSON.parse(localStorage.getItem("bookings")) || [];

/* show only owner bookings */

bookings = bookings.filter(b => b.ownerId === loggedUser.id);

if(bookings.length===0){

table.innerHTML=`<tr><td colspan="6">No Bookings Yet</td></tr>`;
return;

}

bookings.forEach(b=>{

table.innerHTML+=`

<tr>

<td>${b.bookingId}</td>
<td>${b.propertyId}</td>
<td>${b.tenantName}</td>
<td>${b.tenantPhone}</td>
<td>${b.status}</td>

<td>

<button onclick="markBooked(${b.bookingId})">
Booked
</button>

<button onclick="markPending(${b.bookingId})">
Pending
</button>

</td>

</tr>

`;

});

}


/* ============================= */
/* MARK BOOKED */
/* ============================= */

function markBooked(id){

let bookings=JSON.parse(localStorage.getItem("bookings")) || [];

bookings.forEach(b=>{
if(b.bookingId===id){
b.status="Booked";
}
});

localStorage.setItem("bookings",JSON.stringify(bookings));

loadBookings();

}


/* ============================= */
/* MARK PENDING */
/* ============================= */

function markPending(id){

let bookings=JSON.parse(localStorage.getItem("bookings")) || [];

bookings.forEach(b=>{
if(b.bookingId===id){
b.status="Pending";
}
});

localStorage.setItem("bookings",JSON.stringify(bookings));

loadBookings();

}


/* ============================= */
/* PAGE LOAD */
/* ============================= */

document.addEventListener("DOMContentLoaded",function(){

openOwnerTab("addProperty");

loadOwnerProperties();

loadBookings();

});