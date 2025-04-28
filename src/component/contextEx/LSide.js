import { useContext } from "react"
import { DarkModeContext } from "../../context/DarkModeContext"
function LSide(){
    const {isDark} = useContext(DarkModeContext);
    return(
        <div style={{flex : 1, height : '300px', color: isDark ? "white" : "black", backgroundColor : isDark ? "#222" : '#aaa'}}>
            왼쪽메뉴
        </div>
    )
}

export default LSide