import { useState, useEffect } from "react";

function Product() {
    let [list, setList] = useState([]);
    const [product, setProduct] = useState({
        productId: "",
        productName: "",
        price: "",
        stock: "",
        category: ""
      });
    useEffect(() => {
        fetch("http://localhost:3005/product")
            .then(res => res.json())
            .then(data => {
                setList(data.list);
            });

    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    const fnAddList = () => {
        setList([...list, product]);
    }
    return (
        <div>
            <div><input name="productId" placeholder="번호" onChange={handleChange}></input></div>
            <div><input name="productName" placeholder="상품명" onChange={handleChange}></input></div>
            <div><input name="price" placeholder="가격" onChange={handleChange}></input></div>
            <div><input name="stock" placeholder="재고" onChange={handleChange}></input></div>
            <div><input name="category" placeholder="카테고리" onChange={handleChange}></input></div>
            <div><button onClick={fnAddList}>추가</button></div>
            <table>
                <thead>
                    <tr>
                        <th>제품번호</th>
                        <th>제품명</th>
                        <th>가격</th>
                        <th>재고</th>
                        <th>분류</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => (
                        <tr key={item.productId}>
                            <td>{item.productId}</td>
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product