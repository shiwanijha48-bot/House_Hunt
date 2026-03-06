const container=document.getElementById("featuredContainer");

if(container){

properties.slice(0,6).forEach(p=>{

container.innerHTML+=`

<div class="property-card">

<img src="${p.image}">

<div class="property-info">

<h3>${p.title}</h3>

<div class="location">${p.city}</div>

<div class="price">₹${p.price.toLocaleString()}</div>

<p>${p.rooms} BHK • ${p.area}</p>

<a href="property.html?id=${p.id}">View Details</a>

</div>

</div>

`;

});

}

function updateWishlistCount(){

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const countElement = document.getElementById("wishlistCount");

if(countElement){
countElement.innerText = wishlist.length;
}

}

updateWishlistCount();

const toggle=document.getElementById("themeToggle");

toggle.onclick=function(){

document.body.classList.toggle("dark-mode");

localStorage.setItem(
"theme",
document.body.classList.contains("dark-mode") ? "dark" : "light"
);

}

window.onload=function(){

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark-mode");

}

}
