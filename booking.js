const booking = {

id: Date.now(),

propertyId: property.id,
ownerId: property.ownerId,

tenantId: loggedUser.id,
tenantName: loggedUser.name

};

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

bookings.push(booking);

localStorage.setItem("bookings",JSON.stringify(bookings));