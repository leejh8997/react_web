function Body(props){
  console.log(props);
    // let list = props.list.map(item => (
    //   <li key={item.subId}>{item.subName}</li>
    // ));
    let title = <h3>과목 목록</h3>;
    return (
      <div>
        {props.title}
        <ul>
          {title}
          {props.list.map(item => (
            <li key={item.subId}><a href="/" onClick={(e)=>{
              e.preventDefault(); // 태그가 가지고 있는 기본 이벤트를 방지
              props.fnBody(item.subName);
            }}>{item.subName}</a></li>
          ))}
          
        </ul>
      </div>
    )
  }
  export default Body