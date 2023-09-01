const menu = document.querySelectorAll(".na");
let activeItem = null;
const img = document.getElementById("foodimg");
let imageIndex = 0;
const imgArray = ["./img/food/1.png","./img/food/2.png","./img/food/3.png","./img/food/4.png","./img/food/5.png","./img/food/6.png"];
const popup = document.getElementById("popup");
const nae = document.getElementById("user");
//preloadre

window.addEventListener("load",()=>{
  const loader = document.getElementById("loader");
  loader.style.display = "none";
let userdata = prompt("enter your name");
nae.innerHTML = userdata;
setInterval(()=>{
  popup.style.display = "none";
},3000)
})

//   for showing in img id passing an function
function showImage(index) {
  img.src = imgArray[index];
}

// making navbar active boder when ever i clicked on any nav btn the active postion changes
menu.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    if (activeItem) {
      activeItem.classList.remove("activ");
    }
    item.classList.add("activ");
    activeItem = item;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelectorAll(".third-page .sidebar");

  sidebar.forEach(clicked => {
    clicked.addEventListener("click", () => {
      if (clicked.classList.contains("hover")) {
        clicked.classList.remove("hover");
      } else {
        clicked.classList.add("hover");
      }
    });
  });
});

// declaring searchbtn and seacrbox for activating search bar
const searchbtn = document.getElementById("search");

// passing an addEventListener for making searchbar active
searchbtn.addEventListener("click", () => {
  fetchAndRenderRecipes();
});

// declaring a function for fetch data from api and and default data when page is loaded
function fetchAndRenderRecipes() {
  const searchbox = document.getElementById("input").value.trim();

  //  here are the api key or url and main-flex class where the data will shown in our html document
  const recipeAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchbox}`;
  const mealList = document.querySelector(".main-flex");
  
  // Clear existing content means by default data in html docment will earse   
  mealList.innerHTML = "";


  // for fetching data from api using async function for fetch method
  async function getRecipes() {
    try {
      // here response for data are to be send
      const response = await fetch(recipeAPI);
      const data = await response.json();
      // here declaring and blank html tag for showing data in the main flex data or meallist
      let html = "";

      /// here the fetch data stored in data name const variable and passing and foreach loop for showing data one by one
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
            <div class="main-card">
              <div class="img">
                <img src="${meal.strMealThumb}" alt="">
              </div>
              <div class="name">${meal.strMeal}</div>
              <div class="details">
                <div class="m">
                  <div class="dishname"><h3>${meal.strMeal}</h3></div>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus amet molestias eveniet impedit beatae commodi nostrum vel quas consequatur, dolor esse error, iure officia inventore iste! In eaque quod perferendis?</p>
                </div>
              </div>
            </div>
          `;
        });
      } else {
        // empty data whenever any wrong query and any wrong keyword enter by user show this data
        html += `
        <div class="main-card">
          <div class="img">
            <img src="https://i.pinimg.com/600x315/8f/94/a5/8f94a5716d7df50cddaa7894839c8230.jpg" alt="">
          </div>
          <div class="name">not found</div>
          <div class="details">
            <div class="m">
              <div class="dishname"><h3>not found</h3></div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus amet molestias eveniet impedit beatae commodi nostrum vel quas consequatur, dolor esse error, iure officia inventore iste! In eaque quod perferendis?</p>
            </div>
          </div>
        </div>
      `;
      }
      mealList.innerHTML = html;
    } catch (error) {
      console.log('error:', error);
      
    }
  }
/// calling the api for result whnever user enter any search query in searchbar 
  getRecipes();
}

// automatically  carousel after evrey 6s second 
function startCarousel() {
  setInterval(() => {
    imageIndex = (imageIndex + 1) % imgArray.length;
    showImage(imageIndex);
  }, 6000); 
}

// default data on page load
// Call fetchAndRenderRecipes() to show data before search result
fetchAndRenderRecipes();

startCarousel();
