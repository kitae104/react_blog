import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import data from './data.js';
import Detail from './pages/Detail.js';
import axios from 'axios';
import Cart from './pages/Cart.js';
import { useQuery } from 'react-query';


function App() {  

  let [shoes, setShoes] = useState(data);
  let [stocks, setStocks] = useState([10, 11, 12]);

  let navigete = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('watched')) {                    // 로컬 스토리지에 watched가 없으면
      localStorage.setItem('watched', JSON.stringify([]));    // watched를 생성
    }
  }, []); 

  let result = useQuery('user', () => {
    return axios.get('https://codingapple1.github.io/userdata.json')
    .then((a) => {
      return a.data;
    })
    .catch(() => {
      console.log('실패');
    });
  });

  console.log(result.data);

  return (
    <div className="App">           
      
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">React</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => {navigete('/')}}>Home</Nav.Link>
              <Nav.Link onClick={() => {navigete('/detail')}}>Detail</Nav.Link>
              <Nav.Link onClick={() => {navigete('/cart')}}>Cart</Nav.Link>
              <Nav.Link onClick={() => {navigete('/about')}}>About</Nav.Link>
              <Nav.Link onClick={() => {navigete('/about/member')}}>Member</Nav.Link>
              <Nav.Link onClick={() => {navigete('/about/location')}}>Location</Nav.Link>
            </Nav>
            <Nav className="ms-auto" style={{'color':'white'}}>
              { result.isLoading && <div>로딩중...</div>}
              { result.error && <div>로딩실패</div>}
              { result.data && <div>{result.data.name}</div>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   

      <Routes>
        <Route path="/" element={<Main shoes={shoes} />} />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{shoes, stocks}}>
            <Detail shoes={shoes} />
          </Context1.Provider> 
        }/>     
        <Route path="/about" element={<About />}>     
          <Route path="member" element={<h2>회사 구성원</h2>} />
          <Route path="location" element={<h2>위치</h2>} /> 
        </Route>
        <Route path="*" element={<h1>존재하지 않는 페이지입니다.</h1>} />   
      </Routes>      
      {/* <Button onClick={()=> {
        
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result) => {
          console.log(result.data);
          setShoes([...shoes, ...result.data]);   // 기존 데이터에 추가
        })
        .catch(() => {
          console.log('실패');
        })

      }}>버튼</Button> */}
    </div>
  );
}


const About = () => {
  return (
    <div>
      <h2>About</h2>
      <p>회사 정보</p>
      <Outlet></Outlet>
    </div>
  );
} 

const Main = (props) => {
  return (
    <>
    <div className="main-bg"></div>     
      <Container>
        <Row>
          {
            props.shoes.map((a, i) => {
              console.log(a);
              return <Card key={i} shoe={a} i={i+1} />
            })
          }              
        </Row>
      </Container>
    </>
  );
}

const Card = (props) => {   
  console.log(props.i);
  return (
    <Col>
      <img src={process.env.PUBLIC_URL +"/img/shoes" + props.i + ".jpg"} alt="img" width="80%" onClick={
        () => { navigator('/detail/' + props.i)}
      }/>
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </Col>
  );
}

export default App;
