import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import data from './data';

// 발생시 별도의 파일로 분리하여 관리 
const About = lazy(() => import('./pages/About'));
const Cart = lazy(() => import('./pages/Cart'));
const Detail = lazy(() => import('./pages/Detail'));
const Event = lazy(() => import('./pages/Event'));
const Home = lazy(() => import('./pages/Home'));

export let Context1 = createContext();

function App() {
  const [shoes, setShoes] = useState(data);  
  const [stock, setStock] = useState([10, 11, 12]);
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]));
  }, []); 
  
  let result = useQuery(['checkId'], () => {
    return axios.get('https://codingapple1.github.io/userdata.json')
      .then((res) => {
        console.log("요청됨");
        console.log(res.data);
        return res.data;
      })
  });

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Kitae's Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/about');
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/event');
              }}
            >
              Event
            </Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link>
              {result.isLoading && '로딩중'}
              {result.error && '에러'}
              {result.data && result.data.name }
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <Suspense fallback={ <div>페이지 로딩중...</div> }>
        <Routes>
          <Route path="/" element={<Home shoes={shoes} setShoes={setShoes} />} />

          <Route path="/detail/:id" element={
            <Context1.Provider value={{stock}}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          } />
          
          <Route path="/about" element={<About />}>
            <Route path="phone" element={<div>010-222-3333</div>} />
            <Route path="location" element={<About />} />
            <Route path=":name" element={<div>name</div>} />
          </Route>
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일 기념 쿠폰 받기</div>} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>존재하지 않는 페이지입니다.</h1>} />
        </Routes>    
      </Suspense>  
    </div>
  );
}

export default App;