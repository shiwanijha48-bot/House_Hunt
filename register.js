const user = {

id: Date.now(),

name: name,
email: email,
phone: phone,

type: "Renter",
owner:false

};

let users = JSON.parse(localStorage.getItem("users")) || [];

users.push(user);

localStorage.setItem("users",JSON.stringify(users));