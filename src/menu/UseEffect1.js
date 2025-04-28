import { useEffect } from "react";
import { useState } from 'react';

function Effect(){
    let [num, setNum] = useState(1);
    let [num2, setNum2] = useState(1);
    let value = 0;
    useEffect(()=>{ // 최초에 한번 렌더링하고 필요할 때만 렌더링
        console.log("호출됨");
    },[num]); 
    return (<div>
        {num}
        <div>
            <button onClick={()=>{setNum(++num)}}>증가111</button>
        </div>
        <hr></hr>
        {num2}
        <div>
            <button onClick={()=>{setNum2(++num2)}}>증가222</button>
        </div>
    </div>)
}

export default Effect