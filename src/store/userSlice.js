import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
    name: 'user',                        // state 의 이름
    initialState: {name: 'kim', age: 20}, // 초기값    
    reducers: {                         // state 를 변경하는 함수들
        changeName: (state) => {        // state 를 변경하는 함수
            return {...state, name: 'park'};
        },
        increase: (state, action) => {         // state 를 변경하는 함수
            state.age += action.payload;  // state 를 변경할 때는 직접 변경해도 되고, 새로운 객체를 반환해도 된다.
        }
    }
});

export let {changeName, increase} = user.actions  // user 에서 changeName 함수를 가져온다.(디스럭쳐 링 할당)

export default user; 