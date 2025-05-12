
export default function Die(props) {
    return  (
    <button 
       className={`btn-die ${props.isHeld ? "btn-die_held" : "btn-die__notheld"}`}
       onClick={() => props.hold(props.id)}> 
            {props.value}
        </button>
    )
}