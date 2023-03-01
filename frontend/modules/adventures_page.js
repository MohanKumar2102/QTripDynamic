
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  return fetch(`${config.backendEndpoint}/adventures/?city=${city}`).then(res=>res.json()).then(d=>d).catch(e=>null);

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parent = document.getElementById("data");

  for (let a of adventures) {
    let parentDiv = document.createElement("div");
    parentDiv.classList.add("col-12", "col-lg-3", "col-sm-6", "mb-4");

    let anchor = document.createElement("a");
    anchor.href = `detail/?adventure=${a.id}`;
    anchor.setAttribute("id", a.id);

    let adCard = document.createElement("div");
    adCard.classList.add("card", "activity-card");

    let cate = document.createElement("p");
    cate.className = "category-banner";
    cate.textContent = a.category;

    let i = document.createElement("img");
    i.src = a.image;
    i.alt = a.name;
    i.className = "card-img-top";

    let cardBody = document.createElement("div");
    cardBody.classList.add(
      "card-body",
      "text-center",
      "justify-content-between"
    );

    let leftDiv = document.createElement("div");
    leftDiv.className = "text-wrap";
    let l1 = document.createElement("p");
    let l2 = document.createElement("p");
    l1.textContent = a.name;
    l2.textContent = "Duration";
    l1.className = "card-text";
    l2.className = "card-text";
    leftDiv.style.float = "left";
    leftDiv.append(l1, l2);

    let rightDiv = document.createElement("div");
    rightDiv.className = "text-wrap";
    let l3 = document.createElement("p");
    let l4 = document.createElement("p");
    l3.innerHTML = `&#8377; ${a.costPerHead}`;
    l4.textContent = a.duration + "Hours";
    l3.className = "card-text";
    l4.className = "card-text";
    rightDiv.style.float = "right";
    rightDiv.append(l3, l4);

    cardBody.append(leftDiv, rightDiv);
    adCard.append(cate, i, cardBody);

    anchor.append(adCard);
    parentDiv.append(anchor);
    parent.append(parentDiv);
  }
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
  let filteredList = [];
  list.filter((f,i,list)=>{
    for(let c of categoryList){
      if(f.category===c)
      filteredList.push(f)

    }

    
  })
  return filteredList;

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
  let filteredList = [];
  let categoryList = filters.category;
  let durationList = filters.duration
  if(String(filters["duration"]).length>0 && filters["category"].length>0){
    filteredList.push(filterByCategory(list,filters.category));
    filteredList.push(filterByDuration(list,filters.duration));
  }
  else if(String(filters["duration"]).length>0){
    filteredList.push(filterByDuration(list,filters.duration));

  } else if(filters["category"].length>0){
    filteredList.push(filterByCategory(list,filters.category));
  }
  list = filteredList;
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
  let parentDiv1 = document.getElementById("category-selection");
  for(let c of filters.category){
    let spanDiv = document.createElement("span");
    spanDiv.textContent = String(c);
    spanDiv.className = "category-filter";
    spanDiv.setAttribute("id","category-list");

    parentDiv1.append(spanDiv);
    
  }
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
