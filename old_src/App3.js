import { useState } from 'react';
import './App.css';

function App() {
  let post = '리엑트 블로그 연습 사이트';

  const [title, setTitle] = useState([
    '남자 코트 추천',
    '강남 우동 맛집',
    '파이썬 독학',
  ]);
  const [logo] = useState('React Blog'); // logo라는 state를 만들고 'React Blog'로 초기화
  const [like, setLike] = useState([0, 0, 0]); // like라는 state를 만들고 0으로 초기화

  const [modal, setModal] = useState(false); // modal이라는 state를 만들고 false로 초기화
  const [index, setIndex] = useState(0); // index라는 state를 만들고 0으로 초기화
  const [data, setData] = useState(''); // data라는 state를 만들고 '남자 코트 추천'으로 초기화
  const [date, setDate] = useState([
    new Date().toLocaleTimeString(),
    new Date().toLocaleTimeString(),
    new Date().toLocaleTimeString(),
  ]); // date라는 state를 만들고 현재 날짜로 초기화

  const changeLike = (i, e) => {
    console.log(i);
    let newArray = [...like]; // 구조 분해 할당(destructuring assignment)을 사용하여 배열을 복사
    console.log(newArray);
    newArray[i]++; // 복사한 배열의 key번째 요소를 변경
    setLike(newArray); // state를 변경할 때는 setLike()를 사용
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{logo}</h4>
      </div>

      <button
        onClick={() => {
          let newArray = [...title]; // 구조 분해 할당(destructuring assignment)을 사용하여 배열을 복사
          newArray.sort(); // 배열을 정렬
          setTitle(newArray);
        }}
      >
        가나다순으로 정렬
      </button>

      <h4 style={{ color: 'red', fontSize: '16px' }}>{post}</h4>
      {title.map((a, i) => {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(true); // modal state를 반전시킴
                setIndex(i); // index state를 변경
              }}
            >
              {a}{' '}
              <span
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 버블링을 막음
                  changeLike(i, e);
                }}
              >
                👍
              </span>{' '}
              {like[i]}
            </h4>
            <p>{date[i]}</p>
            <button
              onClick={() => {
                let newTitle = [...title];
                newTitle.splice(i, 1); // 배열에서 i번째 요소를 1개 삭제
                setTitle(newTitle);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <input
        onChange={(e) => {
          setData(e.target.value); // input에 입력한 값을 data state에 저장
          console.log(data);
        }}
      />
      <button
        onClick={() => {
          console.log('data : ' + data);
          if (data === '') {
            alert('글 내용을 입력하세요!');
            return;
          }

          let newTitle = [...title];
          let newLike = [...like];
          let newDate = [...date];
          newTitle.unshift(data); // 배열의 맨 앞에 data를 추가
          newLike.unshift(0); // 배열의 맨 앞에 0을 추가
          newDate.unshift(new Date().toLocaleTimeString()); // 배열의 맨 앞에 현재 날짜를 추가

          setTitle(newTitle);
          setLike(newLike);
          setDate(newDate);
        }}
      >
        글발행
      </button>

      {
        // modal이 true일 때만 Modal 컴포넌트가 나타남
        // 자식 컴포넌트에게 state를 전달할 때는 props를 사용(부모 -> 자식)
        modal === true ? (
          <Modal title={title} setTitle={setTitle} index={index} />
        ) : null // if문 대신 삼항 연산자 사용
      }

      <Temp />
    </div>
  );
}

const Temp = () => {
  return <div className="modal">안녕하세요!</div>;
};

const Modal = (props) => {
  return (
    <div className="modal">
      <h4>{props.title[props.index]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        onClick={() => {
          props.title[0] = '여자 코트 추천';
          props.setTitle([...props.title]);
        }}
      >
        글수정
      </button>
    </div>
  );
};
export default App;
