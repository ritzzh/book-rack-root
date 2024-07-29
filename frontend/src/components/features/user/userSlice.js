import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logged: false,
    username: '',
    name: '',
    email: '',
    room: ''
};

const savedUser = localStorage.getItem('user');
if (savedUser) {
  Object.assign(initialState, JSON.parse(savedUser));
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.logged = true;
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.room = action.payload.room;
            localStorage.setItem('user', JSON.stringify(state));
        },
        logout: (state) => {
            state.logged = false;
            state.username = '';
            state.name = '';
            state.email = '';
            state.room = '';
            localStorage.removeItem('user');
        },
        setRoom: (state, action) => {
            state.room = action.payload.room;
            localStorage.setItem('user', JSON.stringify(state));
        }
    }
});

export const { login, logout, setRoom } = userSlice.actions;
export default userSlice.reducer;
