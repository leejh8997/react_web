import '../App.css';
import { useState } from 'react';

function State(){
  let [list, setList] = useState([
    <li key="1">홍길동</li>,
    <li key="2">김철수</li>,
    <li key="3">김정철</li>
  ])
  let name = "";
  const fnAddUser = ()=>{
    let item = <li key={list.length+1}>{name}</li>
    // list.push(item);
    // let newList = [...list, item];
    // newList.push(item);
    setList([...list, item]);
  }
  return (
    <div>
      <input onChange={(e)=>{
        name = e.target.value;
      }}></input>
      <button onClick={fnAddUser}>추가</button>
      {list}
    </div>
  )
}

function NumState() { 
  let [num, setNum] = useState(1);
  // useState를 쓰면 리스트로 반환  0번째 값이 ()안에 값, 1번째 값은 함수
  // num[1](2) num[1]()에 들어간 값을 0번째에 넣고 렌더링
  // let numState = useState(1);
  // let num = numState[0];
  // let setNum = numState[1];
  console.log(num);
  const fnIncrease = function(){
    setNum(++num);
  }
  return (
    <div className="App">
        {num}
        <div>
          <button onClick={fnIncrease}>증가!</button>
        </div>
    </div>
  );
}
export default State;
