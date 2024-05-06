import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {  
  
  let shoes = props.shoes;  
  let setShoes = props.setShoes;

  const [num, setNum] = useState(2);

  return (
    <div>
      <div className="container">
        <button onClick={()=> {
          let newArray = [...shoes];
          newArray.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          });
          console.log(newArray);
          props.setShoes(newArray);
        }}>이름으로 정렬하기</button>
        <button
          onClick={() => {
            if(num < 4) {
              axios
                .get('https://codingapple1.github.io/shop/data' + num + '.json')
                .then((result) => {
                  let newArray = [...shoes, ...result.data]; // 기존 데이터와 새로 가져온 데이터를 합침
                  setShoes(newArray);   // 가져온 데이터를 기존 데이터에 추가
                })
                .catch(() => {
                  console.log('실패했어요');
                });
              setNum(num + 1);  
            } else {
              alert('마지막 페이지입니다.');
            }
          }}
        >
          더보기
        </button>
        <div className="row">          
          {shoes.map((a, i) => {
            return (             
              <Card shoes={props.shoes[i]} i={i} key={i}/>
            )
          })}               
        </div>
      </div>
    </div>
  );
};

const Card = (props) => {
  let navigate = useNavigate();
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
      <Button onClick={()=> navigate(`/detail/${props.shoes.id}`)}>확인</Button>
    </div>
  )
}

export default Home;