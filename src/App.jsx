import './App.css'
import Die from './components/Die'

export default function App() {

function generateAllNewDice() {
  return new Array(10) //creates a new array of length 10
    .fill(0) //fill it with zeros
    .map(() => Math.ceil(Math.random() * 6)) ///map over the array,
}

console.log(generateAllNewDice()) //console log a call to generateAllNewDice()

  return (
    <main>
      <div className='dice-container'>
        <Die value={1}/>
        <Die value={2}/>
        <Die value={3}/>
        <Die value={4}/>
        <Die value={5}/>
        <Die value={6}/>
        <Die value={1}/>
        <Die value={1}/>
        <Die value={1}/>
        <Die value={1}/>
      </div>
    </main>
  )
};

