import { useId } from "react"

function UserInput(){
    let id = useId();
    return(
        <div>
            <label htmlFor={id+".id"}>아이디 : </label>
            <input id={id+".id"}></input>
            <br></br>
            <label htmlFor={id+".pwd"}>비밀번호 : </label>
            <input id={id+".pwd"}></input>
            <br></br>
            <label htmlFor={id+".name"}>이름 : </label>
            <input id={id+".name"}></input>

        </div>
    )
}
function UseIdEx(){
    return(
        <div>
            <UserInput></UserInput>
            <hr></hr>
            <UserInput></UserInput>
            <hr></hr>
            <UserInput></UserInput>
            <hr></hr>
            <UserInput></UserInput>
            
        </div>
    )
}

export default UseIdEx