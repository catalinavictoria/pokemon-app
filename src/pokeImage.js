import './pokeImage.css';
import React from 'react';
import Timer from "react-compound-timer";
import PokemonApp from './App.js'

const imagePath = "https://pokeres.bastionbot.org/images/pokemon/";
const pokePath = "https://pokeapi.co/api/v2/pokemon/";

//this function returns a random number within a range
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//pokemon image and buttons  component
class PokeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeId: "",
      pokeId2: "",
      correctPokeId: "",
      correctPokeName: "",
      pokeImageId: "",
      pokeName1: "",
      pokeName2: "",
      correctAnswer: false,
      message: false,
      correctCounter: 0,
      incorrectCounter: 0,
      buttonState: false,
      newGame: false
    }
  }//constructor

  //this hook loads the function when the pokeImage component is first mounted
  componentDidMount() {
    this.getPokemonNames();
  }//componentDidMount

  //function for getting random ids and making request to api
  getPokemonNames() {
    //enable the buttons again
    this.setState({
      buttonState: false,
      newGame: false
    });

    //variables
    let correctName;
    let correctId;
    let name1;
    let name2;
    let nonImagePokemones = [413, 641, 585, 849, 877, 745];
    // generate two random ids
    let p1 = getRandomInt(1, 887);
    let p2 = getRandomInt(1, 887);
    //while loop for getting a new id that's not the same as the one we already have
    while (p1 === p2 && (nonImagePokemones.includes(p1) || nonImagePokemones.includes(p2))) {
      p2 = getRandomInt(1, 887);
    }
    //setting correct pokemon id
    if (getRandomInt(1, 2) === 1) {
      correctId = p1;
    }
    else {
      correctId = p2;
    }

    console.log("p1 = " + p1);
    console.log("p2 = " + p2);
    console.log("correctId = " + correctId);
    //changing the state of the component
    this.setState({
      pokeId: p1,
      pokeId2: p2,
      correctPokeId: correctId
    });

    //making request for first pokemon name
    console.log("sending request to the pokeapi");
    fetch(`${pokePath}${p1}`)
    .then((response) => {
      if(response.status !== 200) {
        console.log("*** Request not ok: " + response.statusText);
        throw response.statusText;
      }
      else {
        return response.json();
      }
    })
    .then((data) => {
      //variable that stores the name of the pokemon
      name1 = data.name;
      // console.log(name1);
      //making request for second pokemon name
      fetch(`${pokePath}${p2}`)
      .then((response) => {
        if(response.status !== 200) {
          console.log("*** Request not ok: " + response.statusText);
          throw response.statusText;
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        //variable that stores the name of the pokemon
        name2 = data.name;
        // console.log(name2);
        //if statement for setting state of correct pokemon name
        if (p1 === correctId) {
          correctName = name1;
        }
        else {
          correctName = name2;
        }
        //checking everything
        // console.log("correct id: " + correctId);
        // console.log(p1);
        // console.log(p2);
        console.log("name1 = " + name1);
        console.log("name2 = " + name2);
        console.log("correctName = " + correctName);

        //setting the state of the Component
        this.setState({
          pokeName1: name1,
          pokeName2: name2,
          correctPokeName: correctName
        });
      })
    })//end request to api
  }//getPokemonNames

  //function for handling buttons
  handleClick(aName) {
    //checking if the user clicked the button with correct answer
    let nombreCorrecto = this.state.correctPokeName;
    if (aName === nombreCorrecto) {
      this.setState((prevState) => ({
        message: <p className="answer">Yay! You got it!</p>,
        correctCounter: prevState.correctCounter + 1
      }));
    }
    else {
      this.setState((prevState) => ({
        message: <p className="answer">Noup :( It's {this.state.correctPokeName}</p>,
        incorrectCounter: prevState.incorrectCounter + 1
      }));
    }
    //disabled the buttons
    this.setState({
      buttonState: true
    });
    //set timeout for re-rendering and getting a new Pokemon
    setTimeout(() => {
      //set message to be empty again
      this.setState({
        message: <p className="answer"></p>
      })
      //re-render
      this.getPokemonNames();
    }, 2000);
  }//handleClick

  //finishing the game
  handleFinishGame() {
    //show an alert with number of pokémon correctly guessed
    alert(`Good game! You guessed ${this.state.correctCounter} Pokémon correctly!`);
    //set state for new game
    this.setState({
      newGame: true
    });
  }

  render() {
    if (this.state.newGame) {
      return <PokemonApp />
    }

    return(
      <div className="poke-image">
        <div className="title">
          <div className="timer">
            <Timer className="the-timer">
                <Timer.Hours /> hours<br/>
                <Timer.Minutes /> minutes<br/>
                <Timer.Seconds /> seconds
            </Timer>
          </div>
          <img clasName="pokeball" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDI5YjhiZDktY2I1YS00MWU0LTljN2UtZWU1MTZmYWNlOWJiXC9kYXlvM293LTdhYzg2YzMxLThiMmItNDgxMC04OWYyLWU2MTM0Y2FmMWYyZC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LJBxDkRocQStjZpmj9Injfv73mG2SQZ8X6HNdlP5WHw"
          width="100" height="100" />
          <h1 className="titulo">Guess The Pokemon</h1>
          <img clasName="pokeball" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMDI5YjhiZDktY2I1YS00MWU0LTljN2UtZWU1MTZmYWNlOWJiXC9kYXlvM293LTdhYzg2YzMxLThiMmItNDgxMC04OWYyLWU2MTM0Y2FmMWYyZC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.LJBxDkRocQStjZpmj9Injfv73mG2SQZ8X6HNdlP5WHw"
          width="100" height="100" />
          <div className="counters">
            <p className="correct">Correct: {this.state.correctCounter}</p>
            <p className="incorrect">Incorrect: {this.state.incorrectCounter}</p>
          </div>
        </div>
        <div className="image">
          <img className="the-image" src={`${imagePath}${this.state.correctPokeId}.png`} alt="pokemon" width="350" height="350" />
        </div>
        <div className="poke-botones">
          <button
          className="button1"
          disabled={this.state.buttonState}
          value={this.state.pokeName1}
          onClick={() => this.handleClick(this.state.pokeName1)}>{this.state.pokeName1}</button>
          <button
          className="button2"
          disabled={this.state.buttonState}
          value={this.state.pokeName2}
          onClick={() => this.handleClick(this.state.pokeName2)}>{this.state.pokeName2}</button>
        </div>
        <div className="right-or-wrong">
          {this.state.message}
        </div>
        <div className="finish-game">
          <button className="finish" disabled={this.state.buttonState} onClick={() => this.handleFinishGame()}>Finish game</button>
        </div>
      </div>
    );
  }

}//pokeImage component

export default PokeImage;
