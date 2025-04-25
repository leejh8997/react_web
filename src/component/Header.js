function Header(props){
    // let num = 100; // {} 써서 태그 안에서 변수 사용
    console.log(props);
    return (
      // 스타일 정의는 {{}} 안에서, css 2개 이상이면 ,로 구분, -쓰는 이름은 카멜로
      <div> 
        
        <h2 style={{color:'red',fontSize:'100px'}}>
          <a href="/" onClick={(e)=>{
            e.preventDefault(); // 태그가 가지고 있는 기본 이벤트를 방지
            props.fnHeader(props.content);
          }}>{props.title}</a>
          </h2>
      </div>
    )
  }

  export default Header