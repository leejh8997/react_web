import Center from "./Center"
import LSide from "./LSide"
import RSide from "./RSide"


function Body(){
    return(
        <div style={{display : 'flex'}}>
        <LSide></LSide>
        <Center></Center>
        <RSide></RSide>
        </div>
    )
}

export default Body