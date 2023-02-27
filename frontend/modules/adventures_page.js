
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1]


  // let params = URLSearchParams(search);
  // return params.get('city')

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url = `${config.backendEndpoint}/adventures?city=${city}`;
  return fetch(url).then((res)=>res.json()).then(d=>d).catch(e=>null)
  }

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parent = document.getElementById("data");
  
  for (let adventure of adventures){
  
  
  let cardDiv= document.createElement("div");
  cardDiv.classList.add("col-12","col-sm-6","col-lg-3","mb-4");

  let anchor = document.createElement("a");
  anchor.href= `/frontend/detail/?adventure=${adventure.id}`;
  anchor.setAttribute("id",adventure.id)

  let adDiv = document.createElement("div");
  adDiv.classList.add("activity-card", "card");

  let cate = document.createElement("p");
  cate.className = "category-banner";
  cate.textContent = adventure.category;

  let imge = document.createElement("img");
  imge.src= adventure.image;
  imge.classList.add("card-img-top");
  
  let cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body","text-center","d-md-flex","justify-content-between");

  let leftDiv= document.createElement("div");
  let li1 = document.createElement("p");
  let li2 = document.createElement("p");
  li1.textContent = adventure.name;
  li2.textContent = "Duration";
  leftDiv.style.float = "left";
  leftDiv.style.display = "inline";
  leftDiv.append(li1,li2);

  let rightDiv = document.createElement("div");
  let li3 = document.createElement("p");
  let li4 = document.createElement("p");
  li3.textContent =  adventure.costPerHead;
  li4.textContent = adventure.duration +"Hours";
  rightDiv.style.float = "right";
  rightDiv.style.display = "inline";
  rightDiv.append(li3,li4);
  cardBodyDiv.append(leftDiv,rightDiv);

  adDiv.append(imge,cate,cardBodyDiv);
  anchor.append(adDiv);
  cardDiv.append(anchor);

  parent.append(cardDiv);
  }
  console.log(parent.innerHTML)
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
