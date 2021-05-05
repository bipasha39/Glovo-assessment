const fetch = require("node-fetch");
// call APi by List of all cocktails by first letter "G"
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=g")
  .then((response) => response.json())
  .then((data) => {
    //parseDrinks into better formate
    const parsedDrinks = data.drinks.map(parseDrink)

    // filter drinks which have four or more ingredients
    const fancyDrinks = parsedDrinks.filter((drink) => {
      if (drink.ingredients.length > 3) return true;
    });

    // Log the total number of object return
    console.log("total number of drinks are", fancyDrinks.length);
    // For each cocktail object (console.log) its name

   fancyDrinks.forEach(drink => console.log("Drink Id",drink.id,"is called",drink.name,"and is made with",drink.ingredients))
  })

  .catch((e) => console.error(e));

  //parseDrink function takes a drink object and returns a new object with a id ,name and ingredients
  const parseDrink=(drink)=>{
    return {
      id: drink.idDrink,
      name:drink.strDrink,
      ingredients: parseIngredients(drink)
    }
  }
// parse ingredient function takes a drink object and return an array of ingredient name
  const parseIngredients =(drink)=>{
    const array = []
    let i = 1
    while (drink['strIngredient'+ i]!= null){
      array.push(drink['strIngredient'+ i])
      i++
    }
    return array ;
  }