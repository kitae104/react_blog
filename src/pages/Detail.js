import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

let YelloBtn = styled.button`
  background: ${(props) => props.bg}; // props로 받은 값을 사용(재사용)
  color: ${(props) => (props.bg == 'blue' ? 'white' : 'black')};
  padding: 10px;
`;

let Box = styled.div`
  background: gray;
  padding: 20px;
`;

const Detail = (props) => {
  let [alert, setAlert] = useState(true);

  const hideDiv = () => {
    let alertDiv = document.querySelector('.alert');
    alertDiv.style.display = 'none';
  };

  let [count, setCount] = useState(0);
  let { id } = useParams();
  let [inputData, setInputData] = useState('');
  let [tabIndex, setTabIndex] = useState(0);


  let shoe = props.shoes.find((shoe) => {
    return shoe.id == id;
  });

  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(a);
    }; // cleanup 함수
  }, [count]); // count가 변경될때만 실행/ []는 처음 한번만 실행

  useEffect(() => {
    if (isNaN(inputData)) {
      alert('숫자만 입력하세요');
    }
  }, [inputData]);

  let[fade, setFade] = useState('');

  useEffect(() => {  
    // 시간차를 두고 실행
    setTimeout(() => {
      setFade('end');
    }, 100);  
    // cleanup 함수
    return () => {
      setFade('');
    }
  }, []);


  return (
    <div className={`start ${fade}`}>
      {alert === true ? (
        <div className="alert alert-warning">2초 이내 구매시 할일</div>
      ) : null}
      {count}
      <Box>
        <YelloBtn bg="yellow" onClick={() => setCount(count + 1)}>
          버튼
        </YelloBtn>
        <YelloBtn bg="blue">버튼</YelloBtn>
        <input
          onChange={(e) => {
            setInputData(e.target.value);
          }}
        ></input>
        <Row>
          <Col>
            <img
              src={process.env.PUBLIC_URL + '/img/shoes1.jpg'}
              alt="img"
              width="80%"
            />
          </Col>
          <Col>
            <h4>{shoe.title}</h4>
            <p>{shoe.content}</p>
            <p>{shoe.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </Col>
        </Row>
      </Box>

      <Nav fill variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=> {setTabIndex(0);}}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=> {setTabIndex(1);}}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=> {setTabIndex(2);}}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabIndex={tabIndex} />

    </div>
  );
};

const TabContent = ({tabIndex}) => {

  let[fade, setFade] = useState('');

  useEffect(() => {  
    // 시간차를 두고 실행
    setTimeout(() => {
      setFade('end');
    }, 100);  
    // cleanup 함수
    return () => {
      setFade('');
    }
  }, [tabIndex]);

  return (
    <div className={`start ${fade}`}>
      {[<div>0번째 내용</div>, <div>1번째 내용</div>, <div>2번째 내용</div>][tabIndex]}
    </div>
  )
}



export default Detail;
