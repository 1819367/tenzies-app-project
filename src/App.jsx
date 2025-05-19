import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  // state to hold array of dice
  const [ dice, setDice ] = useState(generateAllNewDice());

  const allHeld = dice.every(die => die.isHeld); //true if all dice are held
  const allSameValue = dice.every(die => die.value === dice[0].value); //true if all dice have the same value
  const gameWon = (allHeld && allSameValue) //true if both conditions are true

  function generateAllNewDice() {
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
    setDice(prevDice => prevDice.map(die => //prevDice.map loops through each die
      die.isHeld ? 
        die : //if die.isHeld is true, return the die as is
        {...die, value: Math.ceil(Math.random() * 6) } //If not, return a new object with all the properties, but a new random value
  ))}
  
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
      <div>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all the dice are the same.  Click each die to freeze its current value between rolls.</p>
      </div>
      <div className='dice-container'>
           {gameWon && <Confetti /> }
        {diceElements}
      </div>
      <button 
        className='btn-roll btn-roll_style'
        onClick={() => rollDice()}  
        >
           {gameWon ? "New Game" : "Roll" }  
        
      </button>
    </main>
  )
}

