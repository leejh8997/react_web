import { useState,useRef, useEffect } from "react"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DialogSample from "./DialogSample";
function Ref(){ // 렌더링하지 않으면서 값을 유지, 태그에 접근하기 위해 사용
    let [numState, setNum] = useState(1);
    var numVar = 1;
    let numRef = useRef(1);
    let [value, setValue] = useState("");
    let inputRef = useRef();
    let focusRef = useRef();
    useEffect(()=>{
        console.log(focusRef);
        focusRef.current.focus();
    },[]);
    return(
        <>
            <DialogSample></DialogSample>
            <hr></hr>
            <div>{numState} <Button variant="outlined" size="small" onClick={()=> setNum(++numState)}>state 증가</Button></div>
            <hr></hr>
            <div>{numVar} <Button variant="outlined" size="small" onClick={()=>{
                numVar += 1;
                console.log("var ===>"+ numVar);
            }}>var 증가</Button></div>
            <hr></hr>
            <div>{numRef.current}<Button variant="text" size="small" onClick={()=>{
                numRef.current += 1;
                console.log("ref ===>" + numRef.current);
            }}>Ref 증가</Button></div>
            <hr></hr>
            <input  ref={focusRef} value = {value} onChange={(e)=>{setValue(e.target.value)}} ></input>
            <Button variant="contained" size="small" startIcon={<DeleteIcon />} onClick={()=>{
                setNum(numState + parseInt(value));
                setValue("");
                focusRef.current.focus();         
            }}>state 추가</Button>
            <hr></hr>
            <input ref={inputRef} ></input>
            <Button variant="contained" size="small" endIcon={<SendIcon />} onClick={()=>{
                numRef.current += parseInt(inputRef.current.value);
                inputRef.current.value="";          
            }}>ref 추가</Button>
        </>
    )
}

export default Ref