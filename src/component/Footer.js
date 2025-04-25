function Footer(props) {

  return (
    <div>
      <div>나는 푸터다!!!!!!!!!!!!!!!!</div>

      <ul>
        {props.list.map(num => (
          <li key={num}>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              props.fnFooter(num);
            }}>
              {num}
            </a>
          </li>
        ))}
      </ul>

    </div>
  )
}
export default Footer