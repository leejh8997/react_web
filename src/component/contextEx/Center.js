import { useContext } from "react"
import { DarkModeContext } from "../../context/DarkModeContext"
function Center(){
    const {isDark} = useContext(DarkModeContext);
    return(
        <div style={{flex : 2, height : '300px', color: isDark ? "white" : "black", backgroundColor : isDark ? "#222" : '#eee'}}>
            가운데메뉴
        </div>
    )
}

export default Center