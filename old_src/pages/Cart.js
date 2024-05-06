import React, { useMemo, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addStock } from '../store/cartSlice';
import { increase, changeName } from '../store/userSlice';
import Child from './../components/Child';

function ab(){
  return 10000;
}

const Cart = () => {

  let result = useMemo(() => {
    return ab();
    }, [])

  let cart = useSelector((state) => { return state.cart});
  let state = useSelector((state) => { return state});
  let dispatch = useDispatch();

  let [count, setCount] = useState(0);

  return (
    <div>      
      
      <Child />
      {count}
      <Button onClick={() => {
        setCount(count + 1);
      }}>+</Button>


      <h6>{state.user.name} {state.user.age} 의 장바구니{' '}
      <Button onClick={() => {
        dispatch(increase(100));
      }}>버튼</Button></h6>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((a, i) => {
              return (<RowInfo key={i} cart={cart[i]} i={i+1} />);
            })
          }   

        </tbody>
      </Table> 
    </div>
  );
};

const RowInfo = (props) => {
  let dispatch = useDispatch();
  let cart = props.cart;
  return (
    <tr>
      <td>{cart.id}</td>
      <td>{cart.name}</td>
      <td>{cart.count}</td>
      <td><Button onClick={() => {
        dispatch(addStock(cart.id));
      }}>변경하기</Button></td>
    </tr>
  );
};

export default Cart;

import {useState, useTransition, useDeferredValue} from 'react'

let a = new Array(10000).fill(0)

function App(){
  let [name, setName] = useState('')
  let state1 = useDeferredValue(name)
  
  return (
    <div>
      <input onChange={ (e)=>{ 
          setName(e.target.value) 
      }}/>

      {
        a.map(()=>{
          return <div>{state1}</div>
        })
      }
    </div>
  )
}