import { useReducer, useState } from "react";

function reducer(state, action){
    switch(action.type){
        case "increment" :
            return {number : state.number + 1};
        case "decrement" :
            return {number : state.number - 1};
        case "reset" :
            return {number : 0};
        default :
            throw new Error("제대로 입력해라");
    }
}
let initialValue = {number : 0};
function ReducerEx() {
    let [count, setCount] = useState(0);
    let [state, dispatch] = useReducer(reducer, initialValue);
    const fnCount = (type) => {
        switch (type) {
            case "increment":
                setCount(count + 1);
                break;
            case "decrement":
                setCount(count - 1);
                break;
            case "reset":
                setCount(0);
                break;
            default:
                throw new Error("제대로 입력해라");
        }
    }
    return (
        <>
            <h2>useState로 작성(익명함수)</h2>
            <h3>{count}</h3>
            <div>
                <button onClick={() => {
                    setCount(++count);
                }}>증가</button>
                <button onClick={() => {
                    setCount(prev => prev - 1);
                }}>감소</button>
                <button onClick={() => {
                    setCount(0);
                }}>초기화</button>
            </div>
            <h2>useState로 작성(함수)</h2>
            <h3>{count}</h3>
            <div>
                <button onClick={() => fnCount("increment")}>증가</button>
                <button onClick={() => fnCount("decrement")}>감소</button>
                <button onClick={() => fnCount("reset")}>초기화</button>
            </div>
            <h2>useReducer로 작성</h2>
            <h3>{state.number}</h3>
            <div>
                <button onClick={() => dispatch({type : "increment"})}>증가</button>
                <button onClick={() => dispatch({type : "decrement"})}>감소</button>
                <button onClick={() => dispatch({type : "reset"})}>초기화</button>
            </div>
        </>
    )
}

export default ReducerEx