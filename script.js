//creating library/object to store data locally. how to find local storage on your pc. Go to inspect => Application => Storage => local storage

let availableDates = {
  "2023-10-27": 6,
  "2023-11-01": 8,
  "2023-11-24": 12
};
            
localStorage.setItem("availableDates", JSON.stringify(availableDates)); // sending data to local storage as a json file

// This is the check Availibility button
let checkButton = document.getElementById("checkAvailability");

// function when user clicks the check availaibility button
checkButton.addEventListener("click", function () {
  let list = document.getElementById("openDates"); // grabs unordered list element, it is initialy set to hidden.

  // if button is already visible it means the user already viewed the available dates.
  // so here we skip the displaying day steps and jump out of function.
  if (list.style.visibility == "visible") {
    console.log("already shown");
    list.style.visibility = "hidden";
    while (list.hasChildNodes()){
      list.removeChild(list.firstChild);
    }
    return;
  }

  ///////// The following code runs if the dates are not displayed yet. /////////

  let check = localStorage.getItem("availableDates"); // varible used to retrieved the stored data for available dates
  let currentObject = JSON.parse(check); // we parse the data to use it as a string

  i = 0; // looping through each available date and grabing the capacity
  for (let key in currentObject) {
    let dayitem = document.createElement("li"); // creating a list item to hold each date
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newD = new Date(`${key}\n`);
    let converted_date = newD.toLocaleDateString('en-us', options);
  
    dayitem.innerHTML = `${converted_date}: ${currentObject[key]} slots available.`; // displaying data for now, we will need to format the dates.
    list.append(dayitem); // appending list item to the unordered list
  }
  list.style.visibility = "visible"; // lastly, setting that list to visible
});

let clickButton = document.getElementById("mealButton");
//Clicking the Meals button triggers the function to create an list of meal choices for the user
clickButton.addEventListener("click", userInput());

function userInput() {
  //List of dishes for diet type
  const vegan = [
    "Vegan Chili",
    "Lentil Soup",
    "Vegan Pad Thai",
    "Stuffed Peppers",
    "Sweet Potato and Black Bean Taco"
  ];
  const vegetarian = [
    "Vegetable Stir-Fry",
    "Greek Salad",
    "Veggie Burger",
    "Tomato Basil Soup",
    "Eggplant Parmesan"
  ];
  const keto = [
    "Cauliflower Fried Rice",
    "Bacon Wrapped Asparagus",
    "Garlic Butter Shrimp",
    "Parmesan Crusted Salmon",
    "Chicken Alfredo with Zucchini Noodles"
  ];
  const mediterranean = [
    "Hummus with Pita Bread",
    "Lamb Gyro Wrap",
    "Stuffed Grape Leaves",
    "Baba Ganoush",
    "Fattoush Salad"
  ];

  let mealElement = document.getElementById("meal-list");
   while (mealElement.hasChildNodes()){
      mealElement.removeChild(mealElement.firstChild);
    }

  let input = document.getElementById("diet").value;

  let results = input.toLowerCase();

  //Conditionals based upon user input
  if (results === "vegan") {
    for (let i = 0; i < vegan.length; i++) {
      let dish = vegan[i];
      let listDish = document.createElement("label");
      listDish.textContent = dish;
      let input = document.createElement("input");
      input.type = "radio"; //creates radio buttons for food choices
      input.name = "food";
      input.className = "Choice"; // added a class in the for loop for each radio button
      input.id = vegan[i]; // assigned an id to the radio that matches the food dish
      listDish.appendChild(input);
      mealElement.appendChild(listDish);
    }
  } else if (results === "vegetarian") {
    for (let i = 0; i < vegetarian.length; i++) {
      let dish = vegetarian[i];
      let listDish = document.createElement("label");
      listDish.textContent = dish;
      let input = document.createElement("input");
      input.type = "radio";
      input.name = "food";
      input.className = "Choice"; // added a class in the for loop for each radio button
      input.id = vegetarian[i]; // assigned an id to the radio that matches the food dish
      listDish.appendChild(input);
      mealElement.appendChild(listDish);
    }
  } else if (results === "keto") {
    for (let i = 0; i < keto.length; i++) {
      let dish = keto[i];
      let listDish = document.createElement("label");
      listDish.textContent = dish;
      let input = document.createElement("input");
      input.type = "radio";
      input.name = "food";
      input.className = "Choice"; // added a class in the for loop for each radio button
      input.id = keto[i]; // assigned an id to the radio that matches the food dish
      listDish.appendChild(input);
      mealElement.appendChild(listDish);
    }
  } else if (results === "mediterranean") {
    for (let i = 0; i < mediterranean.length; i++) {
      let dish = mediterranean[i];
      let listDish = document.createElement("label");
      listDish.textContent = dish;
      let input = document.createElement("input");
      input.type = "radio";
      input.name = "food";
      input.className = "Choice"; // added a class in the for loop for each radio button
      input.id = mediterranean[i]; // assigned an id to the radio that matches the food dish
      listDish.appendChild(input);
      mealElement.appendChild(listDish);
    }
  } else if(results !== 'vegan' && results !== 'vegetarian' && results !== 'keto' && results !=='mediterranean' && results.length>=1){
    alert(results+ ' is not valid');
     
  }
}

/////////// added 10/12/2023 ////////////
let submit = document.getElementById("submitReservation");
submit.addEventListener("click", function () {
  
  // varible used to retrieved the stored data for available dates
  let availDate = localStorage.getItem("availableDates"); 
  let currentObject = JSON.parse(availDate); // we parse the data to use it as a string

  let dishUserPicked = " "; // setting dish picked to empty string

  let user = {}; // creating empty object to store user data 
  let name = document.getElementById("name").value; // grabbing user name
  let date = document.getElementById("date").value; // grabbing picked date
  let guest = document.getElementById("guests").value; // grabbing number of guests
  let dishes = document.getElementsByClassName("Choice"); // grabs all of the food bullet points for looping

//// looping through bullet points to find the one selected 
//// and setting the id to the dishUserPicked variable. 
//// This gives us the chose meal picked
  
  let pickedDinner = false; // variable set to false until picking dinner
  
  // loop until you find a picked meal and then set picked dinner to true
  for (i = 0; i < dishes.length; i++) { 
    if (dishes[i].checked) {
      pickedDinner = true
      dishUserPicked = dishes[i].id;
    }
  }
  
  if (pickedDinner === false){ // if the user never picked a dish show alert
    alert("Pick a dish");
    return
  }

  // Check user input before passing it to our object. field can't be empty.
  if (name.length <= 0) {
    alert("Please enter you name."); // display alert if empty
    return;
  }
  
   // checks if the guest field is empty or zero
  if (guest === "" || guest == 0){
    alert("Enter the number of guests.")
    return
  }
  

  ////// checking if the date picked is available
  if (currentObject.hasOwnProperty(date)) { 
    console.log("This date is open.");
  } 
  else { // displays alert message is date is not available
    console.log("nope not here");
    alert("Check those dates. No seats for the day you picked.");
    return;
  }

////// checking if the date picked is available but the guests provided are over the capacity
  if (currentObject.hasOwnProperty(date) && guest > currentObject[date]) {
    alert("There are not enough seats for this date. Please check availibility."); // alert there is not enough seats.
    return;
  }
  
  // After all checks go through. We are placing all collected data into user object. 
  // Converts date to full month, day and year. 
  const convertDate = new Date(`${date}\n`);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let converted = convertDate.toLocaleDateString('en-us', options);
  
  user.Date = converted;
  user.Name = name;
  user.Guests = guest;
  user.Dinner = dishUserPicked;
  
  currentObject[date] = currentObject[date] - guest; // update that date to reflect reservation.
  localStorage.setItem("availableDates", JSON.stringify(currentObject));
  
  // sending reservation data to local storage as a json file
  localStorage.setItem("user", JSON.stringify(user)); 
  
  // varible used to retrieved the stored data for available dates
  let currentReservation = localStorage.getItem("user"); 
  
  let reservationInfo = JSON.parse(currentReservation); // we parse the data to use it as a string
  
  let listInfo = []; // list to store user info statements
  for (let key in reservationInfo) { // addingeach user statement into to our empty info list
    listInfo.push(`${key}: ${reservationInfo[key]}`);
  }
  
   // code to remove food label radio children
  // for (j = 0; j < dishes.length; j++) { 
  //   dishes[j].remove();
  //   }
  
  
  const dishParent = document.getElementById("meal-list");
  console.log(dishParent);
   while (dishParent.hasChildNodes()){
      dishParent.removeChild(dishParent.firstChild);
    }
  
  
  alert(listInfo.join("\n")); // displaying the list statements on the alert window after reservation.
})
  
//Restarts/clears the web page
function reload() {
  location.reload();
}