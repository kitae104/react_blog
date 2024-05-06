import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

let YellowBtn = styled.button`
  background: ${(props) => props.bg || 'yellow'};
  color: ${(props) => props.bg === 'blue' ? 'white' : 'black'};
  padding: 10px;
`;

let Box = styled.div`
  padding: 20px;
  background: grey;
`;

const Detail = (props) => {
  let shoes = props.shoes;
  let id = Number(useParams().id);
  console.log(shoes);
  console.log(id);

  let shoe = shoes.find((shoe) => {
    return shoe.id === id;
  });

  return (
    <div className="container">
      <Box>
        <YellowBtn bg={'blue'}>버튼</YellowBtn>
        <YellowBtn bg={'yellow'}>버튼</YellowBtn>
      </Box>
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
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
