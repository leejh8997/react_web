import Product from "./component/Product";
import { useState } from "react";
function ProductMain(){
    const [show, setShow] = useState(true);
    return(
        <div>
            <button onClick={()=>{setShow(!show);}}>{show?"가리기":"보이기"}</button>
            <div>
            { show && <Product></Product>}
            {/* show ? <Product></Product> : null*/}
            </div>
        </div>
    )
}

export default ProductMain