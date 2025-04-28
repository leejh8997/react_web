import { useState, useEffect } from "react";

function Header({title,fnInfo}){
    return(
    <h2><a href="/" onClick={(e)=>{
        e.preventDefault()
        fnInfo(title);
    }}></a>Hello React!</h2>
    )
}

function Body(props){
    return(
        <>
            {props.count}
            <button onClick={()=>{
                props.fnCount(props.count+1)
            }}>증가</button>
        </>
    )
}
function Footer(props){
    let [list, setList] = useState(props.list);
    const [stu, setStu] = useState({
        stuNo: "",
        stuName: "",
        stuDept: ""
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStu((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    const fnAddList = () => {
        setList([...list, stu]);
        setStu({ stuNo: "", stuName: "", stuDept: "" });
    }
    return(
        <>
            <div><input name="stuNo" placeholder="학번" value={stu.stuNo} onChange={handleChange}></input></div>
            <div><input name="stuName" placeholder="이름" value={stu.stuName} onChange={handleChange}></input></div>
            <div><input name="stuDept" placeholder="학과" value={stu.stuDept} onChange={handleChange}></input></div>
            <div><button onClick={fnAddList}>추가</button></div>
            {list.map((item) => (
                <li key={item.stuNo}>
                    학번 : {item.stuNo} 이름 : {item.stuName} 학과 : {item.stuDept} 
                </li>
            ))}
        </>
    )
}

function Review(){
    let [count, setCount] = useState(0) ;
    let [number, setNumber] = useState(0);
    let list = [
        {stuNo : "1234", stuName : "홍길동", stuDept : "컴퓨터"},
        {stuNo : "1213", stuName : "김철수", stuDept : "전기"},
        {stuNo : "9876", stuName : "박영희", stuDept : "디자인"},
    ]
    useEffect(()=>{
        // alert("안녕?");
        return()=>{
            alert("클린 업 함수!");
        }
    },[count]);
    return(
        <>
        <Header title="Hello React!" fnInfo={(txt)=>(alert(txt))}></Header>
        <hr></hr>
        <Body count={count} fnCount={setCount}></Body>
        <hr></hr>
        <Body count={number} fnCount={setNumber}></Body>
        <Footer list={list}></Footer>
        </>
    )
}

export default Review