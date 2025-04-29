import HeaderContext from "../component/HeaderContext";
import { MyContext } from "../context/MyContext";
import { useContext,useState } from "react";

function Child1(){
    const {isDark} = useContext(MyContext);
    return(
        <div>
            <div style={{color : isDark ? 'black' : 'red'}}>
            자식 컴포넌트 111
            </div>
            <Child2></Child2>
        </div>
    )
}

function Child2(){
    const {isDark,setDark} = useContext(MyContext);
    return(
        <div>
            자식 컴포넌트 222
            <button onClick={()=>{
                setDark(!isDark);
            }}>
                {isDark? '빨간색' : '검은색'}
            </button>
            <Child3></Child3>
        </div>
    )
}

function Child3(){
    
    return(
        <div>
            자식 컴포넌트 333
        </div>
    )
}


function ContextEx(){
    let [isDark,setDark] = useState(false);
    return(
        <div>
            <MyContext.Provider value={{isDark,setDark}}>
                <Child1></Child1>
            </MyContext.Provider>
        </div>
    )
}

export default ContextEx