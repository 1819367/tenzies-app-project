import { useState, useRef, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const buttonRef = useRef(null);

  // state to hold array of dice
  const [ dice, setDice ] = useState(() => generateAllNewDice());  //lazy state initialization

 //refactored code
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if(gameWon) {
      buttonRef.current.focus();
      }
    }, [gameWon]);

  function generateAllNewDice() {
    // console.log("generateAllNewDice was called")  //to test lazy state initialization
    return new Array(10) //creates a new array of length 10
      .fill(0) //fill it with zeros
      .map(() => ({     ///map over the array, replace each zero and return an object
        value: Math.ceil(Math.random() * 6), //value is a random number between 1 and 6.
        isHeld: false, //isHeld is always false.
        id: nanoid() //generate an id
      }))
  }

  //generate new dice with button click and update the state
  function rollDice () {
    if (!gameWon) { 
      setDice(prevDice => prevDice.map(die => //prevDice.map loops through each die
        die.isHeld ? 
          die : //if die.isHeld is true, return the die as is
          {...die, value: Math.ceil(Math.random() * 6) } //If not, return a new object with all the properties, but a new random value
      )) 
    } else {
       setDice(generateAllNewDice()) //code added to play new game when button is clicked
    }
  }
  
  //refactored, update the hold function to flip 'isHeld' property on the object in the array that was clicked
  function hold(id) {
    setDice(prevDice => prevDice.map(item => 
      item.id === id ? 
        {...item, isHeld: !item.isHeld} :
        item
    ))
  }

  //map over dice  array and for each die object render a Die component
  const diceElements = dice.map((dieObj) => (
    <Die 
      key={dieObj.id} 
      value={dieObj.value} //pass value and id properties of each die as a props
      isHeld={dieObj.isHeld} //pass isHeld property of each die as a props
      id={dieObj.id} //pass the id
      hold={hold} //pass the hold function
    />
  ))

  return (
    <main>
      { gameWon && < Confetti /> }
      <div aria-live="polite" className='sr-only'>
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>  
      <div>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all the dice are the same.  Click each die to freeze its current value between rolls.</p>
      </div>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className='btn-roll btn-roll_style'
        onClick={() => rollDice()}  
        ref={buttonRef}
        >
           {gameWon ? "New Game" : "Roll" }   
      </button>
    </main>
  )
}

