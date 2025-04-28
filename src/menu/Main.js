import { useState } from "react"
import Body from "../component/contextEx/Body"
import Footer from "../component/contextEx/Footer"
import Header from "../component/contextEx/Header"
import { DarkModeContext } from "../context/DarkModeContext"
function Main() {
    let [isDark, setDark] = useState(false);
    console.log(setDark);
    return (
        <DarkModeContext.Provider value={{isDark, setDark}}>
            <div style={{ backgroundColor: isDark ? 'black' : 'white', minHeight: '300px' }}>
                <Header></Header>
                <Body></Body>
                <Footer></Footer>
            </div>
        </DarkModeContext.Provider>
    )
}

export default Main