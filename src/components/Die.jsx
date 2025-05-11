
export default function Die(props) {
    return  (
    <button 
       className={`btn-die ${props.isHeld ? "btn-die_held" : "btn-die__notheld"}`}> 
            {props.value}
        </button>
    )
}