import React from 'react';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import {Context1} from './../App';
import { useDispatch } from 'react-redux';
import { addCart } from '../store/cartSlice';

const Detail = (props) => {

  let {stock} = useContext(Context1);   // Deconstructing 문법 : Context1에서 stock을 가져옴

  let [count, setCount] = useState(0);
  let shoes = props.shoes;
  let id = Number(useParams().id);
  let [tabIndex, setTabIndex] = useState(0);
  let [visible, setVisible] = useState('');  

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let shoe = shoes.find((shoe) => {
    return shoe.id === id;
  });

  useEffect(() => {    
    let watchedData = localStorage.getItem('watched');
    watchedData = JSON.parse(watchedData);
    watchedData.push(shoe.id);  
    watchedData = new Set(watchedData);  // 중복 제거  
    watchedData = [...watchedData];      // 배열로 변환
    console.log(watchedData);
    localStorage.setItem('watched', JSON.stringify(watchedData));    
  }, []);
  
  useEffect(() => {  
    let timer = setTimeout(() => {
      deleteItem();
    }, 2000);
    return () => {
      clearTimeout(timer);
    }
  }, []);

  const deleteItem = () => {
    const delDiv = document.querySelector('.alert');  // 특정 요소를 선택
    delDiv.remove();                                  // 특정 요소를 삭제
  } 

  

  useEffect(() => {    
    let timer = setTimeout(() => {
      setVisible('end');
    }, 100);   
    return () => {              // 컴포넌트가 사라질 때 실행
      clearTimeout(timer);
      setVisible('');
    }
  }, []);

  return (
    <div className= {`container start ${visible}`}>
      <div className='alert alert-warning'>
        2초 이내 구매시 할인
      </div>
      {count}{' '}
      <button onClick={() => {
        setCount(count + 1);
      }}>버튼</button>
      <p>재고 : {stock[0]}</p>
      <div className="row">
        <div className="col-md-6">
          <img
            src={'https://codingapple1.github.io/shop/shoes' + (shoe.id + 1) + '.jpg'}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoe.title}</h4>
          <p>{shoe.content}</p>
          <p>{shoe.price}원</p>
          <button className="btn btn-danger" onClick={() => {
            dispatch(addCart(shoe));
            navigate('/cart');
          }}>주문하기</button>
        </div>
      </div>
      <Nav fill variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=> {
            setTabIndex(0);
          }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=> {
            setTabIndex(1);
          }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=> {
            setTabIndex(2);
          }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabIndex={tabIndex} shoes={shoes} />  
    </div>
  );
};

const TabContent = ({tabIndex, shoes}) => {  

  let [fade, setFade] = useState('');

  useEffect(() => {    
    let timer = setTimeout(() => {
      setFade('end');
    }, 100);   
    return () => {              // 컴포넌트가 사라질 때 실행
      clearTimeout(timer);
      setFade('');
    }
  }, [tabIndex]);

  return (<div className={`start ${fade}`}>
    {[<div>{shoes[tabIndex].title}</div>, <div>{shoes[tabIndex].title}</div>, <div>{shoes[tabIndex].title}</div>][tabIndex]}
  </div>)
}

export default Detail;
