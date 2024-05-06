import React, { useState } from 'react';
import './App.css';

function App() {
  let post = '강남 맛집';
  const [title, setTitle] = useState([
    '남자 코트 추천',
    '강남 우동 맛집',
    '파이썬 독학',
  ]); // 제목을 저장하기 위한 변수
  let [like, setLike] = useState([0, 0, 0]); // 좋아요 수를 저장하기 위한 변수
  let [modal, setModal] = useState(false); // modal 상태를 변경하기 위한 변수
  let [index, setIndex] = useState(0); // index를 저장하기 위한 변수
  let [data, setData] = useState(''); // data를 저장하기 위한 변수

  const changeLike = (i) => {    
    let newArray = [...like];
    newArray[i]++;
    setLike(newArray);
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h1>React App</h1>
      </div>

      <button
        onClick={() => {
          let newArray = [...title];
          newArray.sort();
          setTitle(newArray);
        }}
      >
        Sort
      </button>

      <button
        onClick={() => {
          let newTitle = [...title]; // 배열을 복사
          newTitle[index] = '여자 코트 추천';
          setTitle(newTitle); // 배열을 교체
        }}
      >
        글수정
      </button>

      <h4 style={{ color: 'red', fontSize: '2rem' }}>{post}</h4>
      
      {
        title.map((a, i) => {
          return (
            <div className="list" key={i}>  
              <h4
                onClick={() => {
                  setModal(!modal); // modal의 상태를 반전시키는 코드
                  setIndex(i);      // index state를 변경
                }}
              >
                {title[i]} <span onClick={(e) => {
                  e.stopPropagation();
                  changeLike(i);
                }     
                  }>👍</span> {like[i]}
              </h4>
              <p>2021.09.06</p>
              <button className='button' onClick={(i)=> {
                let newTitle = [...title]; // 배열을 복사
                newTitle.splice(i, 1); // 배열에서 i번째 요소를 1개 삭제
                setTitle(newTitle); // 배열을 교체
              }}>삭제</button>
            </div>
          );
        })
      }
      <input type='text' onChange={(e) => {
        setData(e.target.value);  // 비동기 처리      
      }} />
      <button className="button" onClick={() => {
        let newTitle = [...title];  // 배열을 복사
        newTitle.unshift(data);        // 새로운 데이터 배열에 추가
        setTitle(newTitle);         // 배열을 교체
      }} >글발행</button>
      {
        modal === true ? <Modal title={title} color={'#ccc'} setTitle={setTitle} index={index}/> : null
      }
      
    </div>
  );
}

const Modal = (props) => {
  return (
    <div className="modal" style={{background: props.color}}>
      <h4>{props.title[props.index]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => {
          let newTitle = [...props.title]; // 배열을 복사
          newTitle[props.index] = '여자 코트 추천';
          props.setTitle(newTitle); // 배열을 교체
        }}>글수정</button>
    </div>
  );
};

export default App;
