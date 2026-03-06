const urlParams = new URLSearchParams(window.location.search);

const propertyId = urlParams.get("id");

const property = properties.find(p => p.id == propertyId);


const images = [

"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",

"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600",

"https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600",

"https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=1600",

"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600"

];

let current = 0;

function showSlide(){

document.getElementById("heroImage").src = images[current];

}

function nextSlide(){

current++;

if(current >= images.length){
current = 0;
}

showSlide();

}

function prevSlide(){

current--;

if(current < 0){
current = images.length - 1;
}

showSlide();

}

/* AUTO SLIDE */

setInterval(nextSlide, 4000);




showImage();



// PROPERTY DETAILS

const details = document.getElementById("propertyDetails");

details.innerHTML = `

<h1>${property.title}</h1>

<div class="property-price">₹${property.price.toLocaleString()}</div>

<div class="property-meta">

📍 ${property.city}

<br><br>

🛏 ${property.rooms} BHK

<br>

📏 ${property.area}

</div>

<p>

This beautiful property located in ${property.city} is perfect for families looking for comfort and affordability.

Close to schools, hospitals, markets, and public transport.

</p>

<button class="wishlist-btn" onclick="addToWishlist(${property.id})">

❤️ Save to Wishlist

</button>

<div class="contact-box">

<h3>Owner Contact</h3>

<p>Name: Rajesh Sharma</p>

<p>Phone: +91 9876543210</p>

</div>

`;


// -------------------------------------------------------------------------------------------------
function loadMap(){

const mapFrame = document.getElementById("map");

mapFrame.innerHTML = `

<iframe
width="100%"
height="350"
style="border:0"
loading="lazy"
allowfullscreen
src="https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed">
</iframe>

`;

}

loadMap();