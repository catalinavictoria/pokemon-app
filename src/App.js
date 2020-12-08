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
      <div className="start-button">
        <button className="btn" onClick={this.displayImage}>Start Game</button>
      </div>
    );
  }//render

}//pokemonapp component


/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default PokemonApp;
