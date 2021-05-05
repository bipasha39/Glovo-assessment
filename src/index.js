const fetch = require("node-fetch");
// call APi by List of all cocktails by first letter "G"
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g")
  .then((response) => response.json())
  .then((data) => {
    // Log the total number of object return
    console.log("total number of drinks are", data.drinks.length);
    // For each cocktail object (console.log) its name

    console.log(
      "All names are",
      data.drinks.map((drink) => drink.strDrink)
    );
  })

  .catch((e) => console.error(e));
