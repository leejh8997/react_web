import logo from './logo.svg';
import './App.css';

function Header(){
  return (
    // 스타일 정의는 {{}} 안에서, css 2개 이상이면 ,로 구분
    <div> 
      <div style={{color:'red',fontSize:'200px'}}>나는 헤더다!!!!!!!!!</div>
    </div>
  )
}
function Footer(){
  return(
    <div>
      <div>나는 푸터다!!!!!!!!!!!!!!!!</div>
    </div>
  )
}

function Card(props) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      margin: '1rem 0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}

function Button(props) {
  const handleClick = () => {
    alert(props.message || "버튼이 클릭되었습니다!");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px'
      }}
    >
      {props.label || 'Click Me'}
    </button>
  );
}


function App() { // 함수의 대문자로 시작하는 건 컴포넌트
  return (
    <div className="App">
        <Header></Header>
        <h1>Hello StackBlitz!</h1>
        <p>Start editing to see some magic happen :)</p>
        <Card>카드</Card>
        <Button>버튼</Button>
        <Footer></Footer>
    </div>
  );
}

export default App;
