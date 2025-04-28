import { useContext } from "react"
import { DarkModeContext } from "../../context/DarkModeContext"
function Footer(){
    const {isDark} = useContext(DarkModeContext);
    return(
        <div style={{height : '150px', color: isDark ? "white" : "black", backgroundColor : isDark ? "#222" : '#ddd'}}>
            푸터
        </div>
    )
}

export default Footer