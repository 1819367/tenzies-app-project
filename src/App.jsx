import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'

export default function App() {

// state to hold array of dice
const [ dice, setDice ] = useState(generateAllNewDice());

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
  setDice(generateAllNewDice())}

//map over dice  array and for each die object render a Die component
const diceElements = dice.map((dieObj) => (
    <Die key={dieObj.id} value={dieObj.value} /> //pass value and id properties of each die as a props
))

  return (
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button 
        className='btn-roll'
        onClick={() => rollDice()}  
        >
            Roll
      </button>
    </main>
  )
};

