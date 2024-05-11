// redux 용 createStore 를 사용하여 store 를 생성하고, rootReducer 를 연결한다.
import  { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js'; // userSlice.js 를 가져온다.
import cart from './store/cartSlice.js'; // cartSlice.js 를 가져온다.

let stock = createSlice({
    name: 'stock',                        // state 의 이름
    initialState: [10, 11, 12],                        // 초기값    
});


export default configureStore({
    reducer: {
        user : user.reducer,            // user 라는 이름으로 user.reducer 를 사용(등록)
        stock : stock.reducer,          // stock 라는 이름으로 stock.reducer 를 사용(등록)
        cart : cart.reducer,          // cart 라는 이름으로 cart.reducer 를 사용(등록)
    },
});