function displayProperties(list){

const container=document.getElementById("propertyContainer");

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="property-card">

<img src="${p.image}">

<div class="property-info">

<h3>${p.title}</h3>

<p>${p.city}</p>

<p class="price">₹${p.price.toLocaleString()}</p>

<p>${p.rooms} BHK • ${p.area}</p>

<div class="card-btns">

<a href="property.html?id=${p.id}">
<button class="view">View</button>
</a>

<button onclick="addToWishlist(${p.id})" class="wish">
❤️
</button>

</div>

</div>

</div>

`;

});

}


function searchProperties(){

let search=document.getElementById("searchInput").value.toLowerCase();

let maxPrice=document.getElementById("priceFilter").value;

let minRooms=document.getElementById("roomFilter").value;


let filtered=properties.filter(p=>{

return(

(p.city.toLowerCase().includes(search) ||

p.title.toLowerCase().includes(search))

&&

(!maxPrice || p.price<=maxPrice)

&&

(!minRooms || p.rooms>=minRooms)

);

});


displayProperties(filtered);

}


displayProperties(properties);