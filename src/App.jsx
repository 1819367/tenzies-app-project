import { useState } from 'react'
import './App.css'
import Die from './components/Die'

export default function App() {

// state to hold array of dice
const [ dice, setDice ] = useState(generateAllNewDice());

function generateAllNewDice() {
  return new Array(10) //creates a new array of length 10
    .fill(0) //fill it with zeros
    .map(() => Math.ceil(Math.random() * 6)) ///map over the array
}

//generate new dice with button click
function rollDice () {
  setDice(generateAllNewDice())
}

//map over dice and for every die inside the array, render a Die component
const diceElements = dice.map((die) => (
    <Die value={die} />
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

