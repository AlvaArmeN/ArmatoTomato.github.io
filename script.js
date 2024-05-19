const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");
const openHrs = document.querySelector("#openhrs");
const headerGetDataButton = document.querySelector("#headerGetDataButton");
const ipadr = 'https://api.ipify.org?format=json';

const weekday = new Map();
weekday.set(0, "Sunday");
weekday.set(1, "Monday");
weekday.set(2, "Tuesday");
weekday.set(3, "Wednesday");
weekday.set(4, "Thursday");
weekday.set(5, "Friday");
weekday.set(6, "Saturday");

const openHours = new Map();
openHours.set("Sunday", "closed");
openHours.set("Monday", "closed");
openHours.set("Tuesday", "closed");
openHours.set("Wednesday", "16:00-21:00");
openHours.set("Thursday", "16:00-21:00");
openHours.set("Friday", "16:00-22:00");
openHours.set("Saturday", "16:00-22:00");

const xValues = [];
const yValues = [];

document.querySelector(".item2").onmouseover = function(){
  document.querySelector(".item2").style.backgroundColor = "pink";
}

document.querySelector(".item2").onmouseout = function(){
  document.querySelector(".item2").style.backgroundColor = "white";
}

headerGetDataButtononload = async function() {
    const ipresponse = await fetch(ipadr);
    const iparray = await ipresponse.json();
    console.log(iparray);
    console.log(weekday.get("Sunday"));

    const ippos = 'https://api.ipgeolocation.io/ipgeo?apiKey=f26befe3db2143dca44d95e06ad2b005&ip=' + iparray.ip;
    const d = new Date();
    let day = d.getDay();

    console.log(ippos);
    const ipposresponse = await fetch(ippos);
    const ipposarray = await ipposresponse.json();
    console.log(ipposarray);
    console.log(weekday.get(day));
    headerGetDataButton.innerHTML = "<button id ='headerGetDataButton'>Händerna upp i luften</button>"
    if(openHours.get(weekday.get(day)) == "closed"){
      openHrs.innerHTML = `<p> Today Fuzed is ${openHours.get(weekday.get(day))} </p>`;
    }
    else{
    openHrs.innerHTML = `<p> Today Fuzed is open ${openHours.get(weekday.get(day))} </p>`;
    }



    if(ipposarray.country_code2 == "SE") // hemsidan ska vara på svenska
    {
      menu.innerHTML = 
            "<li><a class='menuItem' href='#'>Hem</a></li>" +
            "<li><a class='menuItem' href='#'>Öppettider</a></li>" +
            "<li><a class='menuItem' href='#'>Kontakt information</a></li>" +
            "<li><a class='menuItem' href='#'>Om oss</a></li>";
      menuIcon.innerHTML = "Meny";



    
    }
    else
    {
      menu.innerHTML = 
            "<li><a class='menuItem' href='#'>Home</a></li>" +
            "<li><a class='menuItem' href='#'>Open Hours</a></li>" +
            "<li><a class='menuItem' href='#'>Contact information</a></li>" +
            "<li><a class='menuItem' href='#'>About us</a></li>";
      menuIcon.innerHTML = "Menu";


    };//sätt det i engelska 
};

hamburger.addEventListener("click", async function(){
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } 
  else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    
  }
}) ;
