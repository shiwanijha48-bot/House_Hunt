const form = document.getElementById("propertyForm");
const preview = document.getElementById("preview");

let uploadedImages = [];


/* ============================= */
/* IMAGE PREVIEW */
/* ============================= */

document.getElementById("images").addEventListener("change", function(){

preview.innerHTML="";
uploadedImages = [];

const files = this.files;

for(let file of files){

const reader = new FileReader();

reader.onload=function(e){

uploadedImages.push(e.target.result);

const img=document.createElement("img");
img.src=e.target.result;

preview.appendChild(img);

};

reader.readAsDataURL(file);

}

});


/* ============================= */
/* FORM SUBMIT */
/* ============================= */

form.addEventListener("submit",function(e){

e.preventDefault();


/* logged user */

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if(!loggedUser){
alert("Please login first");
window.location.href="login.html";
return;
}


/* amenities */

const amenities = [];

document.querySelectorAll(".amenities input:checked").forEach(el=>{
amenities.push(el.value);
});


/* property object */

const property = {

id: Date.now(),

ownerId: loggedUser.id,
ownerName: loggedUser.name,
ownerContact: loggedUser.phone,
ownerEmail: loggedUser.email,

title: document.getElementById("title").value,
city: document.getElementById("city").value,
price: document.getElementById("price").value,
rooms: document.getElementById("rooms").value,
area: document.getElementById("area").value,
type: document.getElementById("type").value,
status: document.getElementById("status").value,
description: document.getElementById("desc").value,

amenities: amenities,

address: document.getElementById("address").value,

image: uploadedImages[0] || "",

gallery: uploadedImages

};


/* save properties */

let properties = JSON.parse(localStorage.getItem("properties")) || [];

properties.push(property);

localStorage.setItem("properties",JSON.stringify(properties));


alert("✅ Property Uploaded Successfully!");

form.reset();
preview.innerHTML="";
uploadedImages=[];

});