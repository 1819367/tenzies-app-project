
export default function Die(props) {
    return  (
    <button 
       className={`btn-die ${props.isHeld ? "btn-die_held" : "btn-die__notheld"}`}
       onClick={() => props.hold(props.id)}
       aria-pressed={props.isHeld} // lets the player know the the current pressed state
       aria-label={`Die with a value of ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        > 
            {props.value}
        </button>
    )
}