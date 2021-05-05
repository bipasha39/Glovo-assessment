const fetch = require("node-fetch");
// call APi by List of all cocktails by first letter "G"
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g")
  .then((response) => response.json())
  .then((data) => {
    //parseDrinks into better formate
    const parsedDrinks = data.drinks.map(parseDrink);

    // filter drinks which have four or more ingredients
    const fancyDrinks = parsedDrinks.filter((drink) => {
      if (drink.ingredients.length > 3) return true;
    });

    // Log the total number of object return
    console.log("Total number of drinks are", fancyDrinks.length);
    // For each cocktail object (console.log) its name

    const alcholicdrinks = fancyDrinks.filter(
      (drink) => drink.strAlcoholic == "Alcoholic"
    );
    console.log("Alcholic drinks are");
    alcholicdrinks.forEach(logDrink);

    const nonAlcholicdrinks = fancyDrinks.filter(
      (drink) => drink.strAlcoholic != "Alcoholic"
    );
    console.log("Nonalcholic drinks are");
    nonAlcholicdrinks.forEach(logDrink);
  })

  .catch((e) => console.error(e));

//parseDrink function takes a drink object and returns a new object with a id ,name and ingredients
const parseDrink = (drink) => {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    ingredients: parseIngredients(drink),
  };
};
// parse ingredient function takes a drink object and return an array of ingredient name
const parseIngredients = (drink) => {
  const array = [];
  let i = 1;
  while (drink["strIngredient" + i] != null) {
    array.push({
      name: drink["strIngredient" + i],
      quantity: drink["strMeasure" + i],
    });
    i++;
  }
  return array;
};

const logDrink = (drink) => {
  console.log(
    "Drink Id",
    drink.id,
    "is called",
    drink.name,
    "and is made with",
    drink.ingredients
  );
};
