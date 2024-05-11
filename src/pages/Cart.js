import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increase } from '../store/userSlice.js'; // userSlice.js 에서 changeName 함수를 가져온다.
import { addStock, removeStock } from '../store/cartSlice.js';

const Cart = () => {
  let state = useSelector((state) => {
    return state; // 모든 state를 가져온다. 필요에 따라 원하는 부분만 가져와서 사용
  });

  let dispatch = useDispatch(); // dispatch 함수를 가져온다.

  return (
    <div>
      {state.user.name} {state.user.age}의 장바구니
      <Button onClick={()=>{
        dispatch(increase(10));
      }}>버튼</Button>
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
          {state.cart.map((cart, index) => {
            return (
              <tr key={index}>
                <td>{cart.id}</td>
                <td>{cart.name}</td>
                <td>{cart.count}</td>
                <td>
                  <button onClick={() => {
                    dispatch(addStock(cart));
                  }}>+</button>
                  <button onClick={() => {
                    dispatch(removeStock(cart));
                  }}>-</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
