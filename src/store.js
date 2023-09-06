import { configureStore, createSlice } from '@reduxjs/toolkit';
import data from './db.json';

// Create slice for notes
const notesSlice = createSlice({
  name: 'notes',
  initialState: data.notes, // Menggunakan data dari db.json sebagai initialState
  reducers: {},
});

// Combine reducers
const reducer = {
  notes: notesSlice.reducer,
};

// Create Redux store
const store = configureStore({
  reducer,
});

export default store;
