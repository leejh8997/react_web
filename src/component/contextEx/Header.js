import { useContext } from "react"
import { DarkModeContext } from "../../context/DarkModeContext"

function Header(){
    const {isDark, setDark} = useContext(DarkModeContext);
    return(
        <div style={{height : '150px', color: isDark ? "white" : "black", backgroundColor : isDark ? "#222" : '#ccc'}}>
            헤더
            <button onClick={()=>{
                setDark(!isDark);
            }}>{isDark ? '화이트모드' : '다크모드'}</button>
        </div>
    )
}

export default Header