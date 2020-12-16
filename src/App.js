import './App.css';
import React from 'react';
import PokeImage from './pokeImage.js';


//pokemon app component
class PokemonApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPokemon: false
    };
  }

  displayImage = () => {
    this.setState({
      displayPokemon: !this.state.displayPokemon
    });
  }


  render() {
    if (this.state.displayPokemon) {
      return <PokeImage />
    }
    return(
      <div className="start-game">
        <img className="poke-logo" src="http://pngimg.com/uploads/pokemon_logo/pokemon_logo_PNG3.png" width="442" height="162"/>
        <h1 className="titulo">Guess the Pokémon</h1>
        <button className="btn" onClick={this.displayImage}>Start Game</button>
      </div>
    );
  }//render

}//pokemonapp component

export default PokemonApp;
