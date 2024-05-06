import { Col } from "react-bootstrap";
const Detail = () => {
  return(
    <div>
        <Col>
            <img src={process.env.PUBLIC_URL +"/img/shoes1.jpg"} alt="img" width="80%"/>
            <h4>상품명</h4>
            <p>상품설명</p>
            <p>230000원</p>
            <button className="btn btn-danger">주문하기</button>
        </Col>
    </div>

  ); 
};

export default Detail;
