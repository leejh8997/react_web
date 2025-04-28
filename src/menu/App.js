import '../App.css';
import Header from '../component/Header';
import Body from '../component/Body';
import Footer from '../component/Footer';

function App() { // 함수의 대문자로 시작하는 건 컴포넌트
  let list = [
    {subId: "1", subName:"java"},
    {subId: "2", subName:"html"},
    {subId: "3", subName:"oracle"},
    {subId: "4", subName:"react"},
  ];
  let numList = [1,3,5,2,4];
  return (
    <div className="App">
        <Header title="재형님 바보!!!" content="과목을 보여줍니다." fnHeader={(content)=>{
          alert(content);
        }}></Header>
         <Header title="정철이가 쓴거 아님~~" fnHeader={(content)=>{
          alert(content);
        }}></Header>
        <Body title="" list={list} fnBody={(sub)=>{
          alert(sub);}}></Body>
        <Footer list={numList} fnFooter={(num)=>{
          alert(num);
          // numList 목록으로 출력
          // 목록 클릭 시 해당 숫자 alert창에 띄우기
        }}></Footer>
    </div>
  );
}

export default App;
