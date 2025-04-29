import { useReducer, useState,useRef } from "react";

function reducer(state, action){
    let item;
    let last = state[state.length-1];
    switch(action.type){
        case "deposit" :
            item = {req: action.req, money : last.money + Number(action.req), type : action.type, date : new Date()};
            return [...state, item];
        case "withdrawal" :
            if((last.money >= Number(action.req))){
                item = {req: action.req, money : last.money - Number(action.req), type : action.type, date : new Date()};
                return [...state, item];
            }else {
                alert("통장 잔고가 모자랍니다.");
                return state;
            }
            
        case "deactivation" :
            if (state.length === 0) {
                return state;
            }
            if(last.money == 0){
                alert("해지되었습니다.");
                
                return [];
            } else{
                alert("잔금이 있어 해지할 수 없습니다.");
                return state;
            }
            
        default :
            throw new Error("제대로 입력해라");
        
    }
}
let initialValue = [
    {req: 0, money : 0, type : "initial", date : new Date()},
    {req: 10000, money : 10000, type : "deposit", date : new Date()},
    {req: 3000, money : 7000, type : "withdrawal", date : new Date()},
];
function ReducerEx2() {
    let [state, dispatch] = useReducer(reducer, initialValue);
    // let [value, setValue] = useState("");
    let inputRef = useRef();
    return (
        <>  
            <h3>현재 금액 : {state.length > 0 ? state[state.length-1].money : 0}</h3>
            <br></br>
            {/* <input placeholder="금액" onChange={(e)=>{setValue(e.target.value)}} value={value}></input> */}
            <input ref={inputRef} placeholder="금액"></input>
            <div>
                {/* <button onClick={()=>{dispatch({type : "deposit", req : value})}}>입금</button>
                <button onClick={()=>{dispatch({type : "withdrawal", req : value})}}>출금</button>
                <button onClick={()=>{dispatch({type : "deactivation"})}}>해지</button> */}
                <button onClick={()=>{
                    let req = parseInt(inputRef.current.value);
                    inputRef.current.value="";
                    dispatch({type : "deposit", req})}}>입금</button>
                <button onClick={()=>{
                    let req = parseInt(inputRef.current.value);
                    inputRef.current.value="";
                    dispatch({type : "withdrawal", req})}}>출금</button>
                <button onClick={()=>{
                    inputRef.current.value="";
                    dispatch({type : "deactivation"})}}>해지</button>
            </div>
            {state.map((item)=>{
                return (
                    <li>
                        {item.type=="deposit" ? "입금" : item.type=="withdrawal" ? "출금" : "개설"},
                         요청금액: {item.req}, 현재 잔액 : {item.money}, 현재 날짜 : {item.date.toISOString()}
                        
                    </li>
                );
            })}
            {/* <table>
                <thead>
                    <tr>
                        <th>잔고</th>
                        <th>변동 금액</th>                    
                        <th>종류</th>
                        <th>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map(item => (
                        <tr key={item.date.toISOString()}>
                            <td>{item.money}</td>
                            <td>{item.req}</td>
                            <td>{item.type}</td>
                            <td>{item.date.toISOString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>
    )
}

export default ReducerEx2