import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log(config.backendEndpoint);
  // console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  // console.log("From init()");

}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data


  
  const d =  (fetch("http://43.204.249.25:8082/cities").then((res)=>res.json()).then(d=>d).catch(e => null))
  // Promise.reject(new Error(null))
  return (d) ;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parent = document.getElementById("data");
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("col-12","col-sm-6","col-lg-3","mb-4");
  let tileDiv = document.createElement("div");
  tileDiv.classList.add("tile");
  // tileDiv.setAttribute("id","data")
  let textDiv = document.createElement("div");
  textDiv.classList.add("tile-text","text-center");

  let anchor = document.createElement("a");
  anchor.setAttribute("href","/frontend/pages/adventures/?city="+id);
  anchor.setAttribute("id",id)

  let head = document.createElement("h5");
  head.textContent = city;
  let des = document.createElement("p");
  des.textContent = description;
  
  let img= document.createElement("img");
  img.src = image;
  img.alt= city+ ` photo`;
  textDiv.append(head,des);
  tileDiv.append(img,textDiv);
  anchor.append(tileDiv);
  // anchor.append(img,textDiv)
  cardDiv.append(anchor);

  parent.append(cardDiv);


}

export { init, fetchCities, addCityToDOM };
