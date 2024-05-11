import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
    name: 'cart',                        // state 의 이름
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],                        // 초기값    
    reducers: {
        addStock: (state, action) => {
            let found = state.findIndex((a)=>{return a.id === action.payload.id});  // action.payload.id 와 같은 id를 찾는다.
            if(found >= 0) {
                state[found].count++;
            } else {
                state.push({...action.payload, count: 1});
            }
        },
        removeStock: (state, action) => {
            let found = state.findIndex((a)=>{return a.id === action.payload.id});  // action.payload.id 와 같은 id를 찾는다.
            if(found >= 0) {
                state[found].count--;
            } else {
                console.log('상품이 없습니다.');
            }
        }, 
        addCart: (state, action) => {
            let found = state.findIndex((a)=>{return a.id === action.payload.id});
            if(found >= 0) {
                state[found].count++;
            } else {
                state.push({id: action.payload.id, name: action.payload.title, count: 1});
            }
        }
    }
});

export let {addStock, removeStock, addCart} = cart.actions  // cart 에서 addCart 함수를 가져온다.(디스럭쳐 링 할당)

export default cart;
