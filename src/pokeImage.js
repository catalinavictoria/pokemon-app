import './pokeImage.css';
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
const startPokemon2 = getRandomPokemonId(1, 887);
//while loop for getting a new id that's not the same as the one we already have
while (startPokemon == startPokemon2) {
  startPokemon2 = getRandomPokemonId(1, 877);
}

console.log(startPokemon);
console.log(startPokemon2);

//pokemon image and buttons  component
class PokeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeId: startPokemon,
      pokeId2: startPokemon2,
      pokeImage: startPokemon,
      pokeName: "",
      pokeName2: ""
    }
  }//constructor

  //this hook loads the function when the pokeImage component is first mounted
  componentDidMount() {
    this.getPokemonNames();
  }

  //function for calling the API
  getPokemonNames() {
    //making request for first pokemon name
    console.log("sending request to the pokeapi");
    fetch(`${pokePath}${startPokemon}`)
    .then((response) => {
      if(response.status != 200) {
        throw response.statusText;
        console.log("*** Request not ok: " + response.statusText);
      }
      else {
        return response.json();
      }
    })
    .then((data) => {
      //create a variable that stores the name of the pokemon
      let name1 = data.name;
      console.log(name1);
      //setting the state of the Component
      this.setState({
        pokeName: name1
      });
    })

    //making request for second pokemon name
    fetch(`${pokePath}${startPokemon2}`)
    .then((response) => {
      if(response.status != 200) {
        throw response.statusText;
        console.log("*** Request not ok: " + response.statusText);
      }
      else {
        return response.json();
      }
    })
    .then((data) => {
      //create a variable that stores the name of the pokemon
      let name2 = data.name;
      console.log(name2);
      //setting the state of the Component
      this.setState({
        pokeName2: name2
      });
    })
  }

  render() {
    return(
      <div className="poke-image">
        <h1 className="titulo">Guess The Pokemon!</h1>
        <div className="image">
          <img className="the-image" src={`${imagePath}${this.state.pokeId}.png`} alt="pokemon-image" width="400" height="400" />
        </div>
        <div className="poke-botones">
          <button className="button1">{this.state.pokeName}</button>
          <button className="button2">{this.state.pokeName2}</button>
        </div>
      </div>
    );
  }

}//pokeImage component

export default PokeImage;
