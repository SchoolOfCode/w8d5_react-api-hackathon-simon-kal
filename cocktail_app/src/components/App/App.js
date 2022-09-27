import "./App.css";
import CocktailViewer from "../CocktailDisplay";
import { useEffect, useState } from "react";
// import CocktailName from "../CocktailName";

function App() {
  const [id, setId] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [instructions, setInstructions] = useState();
  const [ingredient1, setIngredient1] = useState();
  const [ingredient2, setIngredient2] = useState();
  const [ingredient3, setIngredient3] = useState();
  const [strMeasure1, setMeasure1] = useState();
  const [strMeasure2, setMeasure2] = useState();
  const [strMeasure3, setMeasure3] = useState();

  useEffect(() => {
    async function fetchCocktail() {
      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/random.php`
      );
      response = await response.json();
      console.log(response);
      console.log(response.drinks[0].strDrink);
      setImage(response.drinks[0].strDrinkThumb);
      setName(response.drinks[0].strDrink);
      setInstructions(response.drinks[0].strInstructions);
      setIngredient1(response.drinks[0].strIngredient1);
      setIngredient2(response.drinks[0].strIngredient2);
      setIngredient3(response.drinks[0].strIngredient3);
      setMeasure1(response.drinks[0].strMeasure1);
      setMeasure2(response.drinks[0].strMeasure2);
      setMeasure3(response.drinks[0].strMeasure3);
    }
    fetchCocktail();
  }, [id]);

  function handleClick() {
    const randomId = Math.floor(Math.random() * (1500 - 1 + 1)) + 1;
    setId(randomId);
    console.log(randomId);
  }

  function handleNoAlcohol(choice) {
    console.log(choice);
    async function noAlcohol() {
      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
      );
      response = await response.json();
      const randomId = Math.floor(Math.random() * (1500 - 1 + 1)) + 1;
      console.log(response);
      setImage(response.drinks[randomId].strDrinkThumb);
      setName(response.drinks[randomId].strDrink);
    }
    noAlcohol();
  }



  function handleUserChoice(spiritChoice) {
    console.log(spiritChoice);
    async function spiritFilter() {
      let response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spiritChoice}`
      );
      response = await response.json();
      console.log(response);
      setImage(response.drinks[0].strDrinkThumb);
      setName(response.drinks[0].strDrink);
    }
    spiritFilter();
  }

  return (
    <div className="App">
      <div id="background_img">
        <div id="heading_body">
          <h1>Random Cocktail Generator</h1>
        </div>
        <p id="main_text">Show me a cocktail with...</p>
        <button id="button" onClick={(e) => handleUserChoice(e.target.innerHTML)}>
          Gin
        </button>
        <button id="button" onClick={(e) => handleUserChoice(e.target.innerHTML)}>Whiskey</button>
        <button id="button" onClick={(e) => handleUserChoice(e.target.innerHTML)}>Vodka</button>
        <button id="button" onClick={(e) => handleUserChoice(e.target.innerHTML)}>Rum</button>
        <button id="button" onClick={(e) => handleNoAlcohol(e.target.innerHTML)}>No Alcohol</button>
        <br />
        <p id="main_text">Or just get me </p>
        <button id="button" onClick={handleClick}>
          A Random Cocktail
        </button>
        <div id="main_body">
          <p id="name">{name}</p>
          <img src={image} alt="cocktail" id="cocktail_img" />
          <CocktailViewer id={id} />
          <p id="main_text">You'll need...</p>
          <p id="ingredient_text">
            {strMeasure1} of {ingredient1},
          </p>
          <p id="ingredient_text">
            {strMeasure2} of {ingredient2},
          </p>
          <p id="ingredient_text">
            {strMeasure3} of {ingredient3},
          </p>
        </div>
        <p id="main_text">Instructions</p>
        <p id="instructions">{instructions}</p>
      </div>
    </div>
  );
}

export default App;
