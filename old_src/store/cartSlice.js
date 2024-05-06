import { createSlice } from '@reduxjs/toolkit';

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    addStock(state, action) {
      let findItem = state.find((item) => {
        return item.id === action.payload;
      });
      findItem.count++;
    },
    addCart(state, action) {
      let findItem = state.find((item) => {
        return item.id === action.payload.id;
      });
      if (findItem === undefined) {
        state.push({ id: action.payload.id, name: action.payload.title, count: 1 });
      } else {
        findItem.count++;
      }
    },
  },
});

export let { addStock, addCart } = cart.actions;
export default cart;