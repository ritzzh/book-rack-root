import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logged: false,
  username: '',
  name: '',
  email: '',
  room: '',
  readBooks: [], // List of books that are read
  wantToReadBooks: [], // List of books to be read
};

// Retrieve user information from localStorage if available
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
      state.readBooks = [];
      state.wantToReadBooks = [];
      localStorage.removeItem('user');
    },
    setRoom: (state, action) => {
      state.room = action.payload.room;
      localStorage.setItem('user', JSON.stringify(state));
    },
    addBook: (state, action) => {
      // Action to add a book to either "Read" or "Want to Read" list
      const { book, status } = action.payload;
      if (status === 'read') {
        state.readBooks.push(book);
      } else if (status === 'want_to_read') {
        state.wantToReadBooks.push(book);
      }
      localStorage.setItem('user', JSON.stringify(state));
    },
    removeBook: (state, action) => {
      // Action to remove a book from a list
      const { bookId, status } = action.payload;
      if (status === 'read') {
        state.readBooks = state.readBooks.filter((book) => book._id !== bookId);
      } else if (status === 'want_to_read') {
        state.wantToReadBooks = state.wantToReadBooks.filter((book) => book._id !== bookId);
      }
      localStorage.setItem('user', JSON.stringify(state));
    },
    updateBookStatus: (state, action) => {
      // Action to move a book between "Read" and "Want to Read"
      const { bookId, newStatus } = action.payload;
      let book;

      if (newStatus === 'read') {
        // Move book from "Want to Read" to "Read"
        book = state.wantToReadBooks.find((book) => book._id === bookId);
        if (book) {
          state.wantToReadBooks = state.wantToReadBooks.filter((book) => book._id !== bookId);
          state.readBooks.push(book);
        }
      } else if (newStatus === 'want_to_read') {
        // Move book from "Read" to "Want to Read"
        book = state.readBooks.find((book) => book._id === bookId);
        if (book) {
          state.readBooks = state.readBooks.filter((book) => book._id !== bookId);
          state.wantToReadBooks.push(book);
        }
      }
      localStorage.setItem('user', JSON.stringify(state));
    },
  },
});

export const { login, logout, setRoom, addBook, removeBook, updateBookStatus } = userSlice.actions;
export default userSlice.reducer;
