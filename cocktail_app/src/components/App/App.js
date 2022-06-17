import "./App.css";
import CocktailViewer from "../CocktailDisplay";
import { useEffect, useState } from "react";
import CocktailName from "../CocktailName";

function App() {
  const [id, setId] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [instructions, setInstructions] = useState();
  const [ingredient1, setIngredient1] = useState();
  const [ingredient2, setIngredient2] = useState();
  const [ingredient3, setIngredient3] = useState();
  const [strMeasure1, setMeasure1] = useState();

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
    }
    fetchCocktail();
  }, [id]);

  function handleClick() {
    const randomId = Math.floor(Math.random() * (1500 - 1 + 1)) + 1;
    setId(randomId);
    console.log(randomId);
  }

  return (
    <div className="App">
      <h1>Random Cocktail Generator</h1>
      <p>I need a cocktail with...</p>
      <button>Gin</button>
      <button>Whiskey</button>
      <button>Vodka</button>
      <button>Rum</button>
      <button>No Alcohol</button>
      <br />
      <p>Or just get me </p>
      <button onClick={handleClick}>A Random Cocktail</button>

      <p id="name">{name}</p>
      <img src={image} alt="cocktail" id="cocktail_img" />
      <CocktailViewer id={id} />
      <p id="instructions">{instructions}</p>
      <p>You'll need...</p>
      <p>
        {strMeasure1} of {ingredient1},
      </p>
      <p>{ingredient2},</p>
      <p>{ingredient3},</p>
    </div>
  );
}

export default App;
