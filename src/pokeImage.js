import './pokeImage.css';
import React from 'react';

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
      correctCounter: "",
      incorrectCounter: ""
    }
  }//constructor

  //this hook loads the function when the pokeImage component is first mounted
  componentDidMount() {
    this.getPokemonNames();
  }//componentDidMount

  //function for getting random ids and making request to api
  getPokemonNames() {
    //variables
    let correctName;
    let correctId;
    let name1;
    let name2;
    // generate two random ids
    let p1 = getRandomInt(1, 887);
    let p2 = getRandomInt(1, 887);
    //while loop for getting a new id that's not the same as the one we already have
    while (p1 === p2) {
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
        message: <p className="incorrect-answer">Yay! You got it!</p>,
        correctCounter: prevState.correctCounter + 1
      }));
    }
    else {
      this.setState((prevState) => ({
        message: <p className="incorrect-answer">Noup :( It's {this.state.correctPokeName}</p>,
        incorrectCounter: prevState.incorrectCounter + 1
      }));
    }
    //set timeout for re-rendering and getting a new Pokemon
    setTimeout(() => {
      //set message to be empty again
      this.setState({
        message: <p className="answer"></p>
      })
      //re-render the component
      this.getPokemonNames();
    }, 2000);

    console.log(this.state.correctCounter);
    console.log(this.state.incorrectCounter);
  }//handleClick

  render() {
    return(
      <div className="poke-image">
        <h1 className="titulo">Guess The Pokemon!</h1>
        <div className="image">
          <img className="the-image" src={`${imagePath}${this.state.correctPokeId}.png`} alt="pokemon" width="400" height="400" />
        </div>
        <div className="poke-botones">
          <button className="button1"
          value={this.state.pokeName1} onClick={() => this.handleClick(this.state.pokeName1)}>{this.state.pokeName1}</button>
          <button className="button2"
          value={this.state.pokeName2} onClick={() => this.handleClick(this.state.pokeName2)}>{this.state.pokeName2}</button>
        </div>
        <div className="right-or-wrong">
          {this.state.message}
        </div>
      </div>
    );
  }

}//pokeImage component

export default PokeImage;
