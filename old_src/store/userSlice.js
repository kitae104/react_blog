import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: {
    name: 'kim kitae',
    age: 30,
  },
  reducers: {
    changeName(state) {
      state.name = 'park';
    },
    increase(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeName, increase } = user.actions;

export default user;