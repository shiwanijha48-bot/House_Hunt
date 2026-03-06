const toggle = document.getElementById("themeToggle");

toggle.onclick = function(){

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){
localStorage.setItem("theme","dark");
}else{
localStorage.setItem("theme","light");
}

}


window.onload = function(){

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){
document.body.classList.add("dark-mode");
}

}