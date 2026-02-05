document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());
(function(){
const btn=document.getElementById("loadCoffeeBtn");
const img=document.getElementById("coffeeImg");
const status=document.getElementById("coffeeStatus");
if(!btn)return;
btn.onclick=()=>{img.src="https://picsum.photos/800/500?"+Date.now();status.textContent="Loaded image from public endpoint";};
})();