import { useContext } from "react"
import { DarkModeContext } from "../../context/DarkModeContext"
function RSide(){
    const {isDark} = useContext(DarkModeContext);
    return(
        <div style={{flex : 1, height : '300px', color: isDark ? "white" : "black", backgroundColor : isDark ? "#222" : '#bbb'}}>
            오른쪽메뉴
        </div>
    )
}

export default RSide