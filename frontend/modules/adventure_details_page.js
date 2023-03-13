import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let searchParams = new URLSearchParams(search);

  return searchParams.get('adventure');

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
     return fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`).then(res =>res.json()).then(d=>d).catch(e=>null)
}
  // Place holder for functionality to work in the Stubs
  catch(e){
  return null;}
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  document.getElementById("adventure-content").textContent = adventure.content;

  const parentDiv= document.createElement("div");
  parentDiv.append(adventure.images.forEach(i=>
   document.getElementById("photo-gallery").innerHTML +=
   `<img src = "${i}" class="activity-card-image">` 


    ))
    

  

}

// <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators" id="carousel">
  
    
  </div>
  <div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

images.forEach((i,index) => {
  

  const carItem = document.createElement("div");
  const activeClass= index===0?"active":"";
  carItem.className = `carousel-item ${activeClass}`;
  
  carItem.innerHTML = `<img src= ${i} alt ="Picture ${index+1}" class="activity-card-image pb-3 pb-md-0">`
  document.getElementById("carousel-inner").append(carItem);

  
  const indicator = `
  <button type="button" data-bs-target="#carouselExampleIndicators" 
  data-bs-slide-to="${index}" 
  ${index === 0? 'class="active"':""} 
  aria-current='true'
  aria-label="Slide ${index+1}"></button>`

  document.getElementById("carousel").innerHTML += indicator;

});

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;

  }else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = adventure.costPerHead*persons;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.getElementById("myForm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const data ={name : e.target.elements.name.value,
    date : (e.target.elements.date.value),
    person: e.target.elements.person.value,
    adventure:adventure.id}
    try{
    let res = await fetch(config.backendEndpoint+`/reservations/new`,{
      method:"POST",
      
      headers:{"content-type":"application/json"},
      body:JSON.stringify(data)
    });
    if (res.ok){
      alert("Success!");
      window.location.reload();
    }
    else{
      alert("Failed!");
    }

  }catch(error){
    alert(error);
  }

})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
