/* =============================== */
/* GET LOGGED USER */
/* =============================== */

const user = JSON.parse(localStorage.getItem("loggedUser"));

if(!user){
alert("Please login first");
window.location.href = "login.html";
}


/* =============================== */
/* ELEMENTS */
/* =============================== */

const container = document.getElementById("wishlistContainer");
const emptyMessage = document.getElementById("emptyMessage");

const wishlistKey = "wishlist_" + user.email;


/* =============================== */
/* ADD TO WISHLIST */
/* =============================== */

function addToWishlist(id){

/* if id not passed → get from URL */

if(!id){
const params = new URLSearchParams(window.location.search);
id = params.get("id");
}

let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

/* combine default + owner properties */

let ownerProps = JSON.parse(localStorage.getItem("ownerProperties")) || [];

let allProperties = [...properties, ...ownerProps];

const property = allProperties.find(p => p.id == id);

if(!property){
alert("Property not found");
return;
}

/* check duplicate */

const exists = wishlist.find(p => p.id == id);

if(exists){
alert("Already in wishlist ❤️");
return;
}

wishlist.push(property);

localStorage.setItem(wishlistKey, JSON.stringify(wishlist));

alert("Added to Wishlist ❤️");

}


/* =============================== */
/* DISPLAY WISHLIST */
/* =============================== */

function displayWishlist(){

if(!container) return;

let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

container.innerHTML = "";

if(wishlist.length === 0){
emptyMessage.style.display = "block";
return;
}

emptyMessage.style.display = "none";

wishlist.forEach((p,index)=>{

container.innerHTML += `

<div class="property-card">

<img src="${p.image}">

<div class="property-info">

<h3>${p.title}</h3>

<p>${p.location}</p>

<div class="property-price">
₹${p.price.toLocaleString()}
</div>

<p>${p.rooms} BHK • ${p.area}</p>

<div class="card-buttons">

<a href="property.html?id=${p.id}" class="view-btn">
View Details
</a>

<button onclick="removeItem(${index})" class="remove-btn">
Remove
</button>

</div>

</div>

</div>

`;

});

}


/* =============================== */
/* REMOVE ITEM */
/* =============================== */

function removeItem(index){

let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

wishlist.splice(index,1);

localStorage.setItem(wishlistKey, JSON.stringify(wishlist));

displayWishlist();

}


/* =============================== */
/* PAGE LOAD */
/* =============================== */

if(container){
displayWishlist();
}