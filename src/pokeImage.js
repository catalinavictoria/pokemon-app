import React from 'react';

const imagePath = "https://pokeres.bastionbot.org/images/pokemon/";
const pokePath = "https://pokeapi.co/api/v2/pokemon/";

//this function returns a random number within a range
function getRandomPokemonId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//getting an id to start with
const startPokemon = getRandomPokemonId(1, 887);

//function for calling the API
function getPokemonName() {
  console.log("sending request to the pokeapi");
  fetch(`${pokePath}${startPokemon}`)
  .then((response) => {
    if(response.status != 200) {
      throw response.statusText;
      console.log("*** Request not ok: " + response.statusText);
    }
    else {
      response.json();
    }
  })
  .then((data) => {
    console.log(data);
    //create a variable that stores the name of the pokemon
    let name = data.name;
    console.log(name);
  })
}

//pokemon image and buttons  component
class PokeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeId: startPokemon,
      pokeImage: startPokemon,
      pokeName: "",
    }
  }//constructor

  render() {
    return(
      <div className="Image">
        <img src={`${imagePath}${this.state.pokeId}.png`} alt="pokemon-image" width="400" height="400" />
      </div>
    );
  }

}//pokeImage component

export default PokeImage;
