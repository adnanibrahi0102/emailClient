import { createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
  name: 'emails',
  initialState: {
    emailList: [],      
    selectedEmail: null, 
  },
  reducers: {
    setEmailList: (state, action) => {
      state.emailList = action.payload;
    },
    selectEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    markAsRead: (state, action) => {
      const emailId = action.payload;
      const email = state.emailList.find((email) => email.id === emailId);
      if (email) {
        email.isRead = true;
      }
    },
    markAsUnread: (state, action) => {
      const emailId = action.payload;
      const email = state.emailList.find((email) => email.id === emailId);
      if (email) {
        email.isRead = false;
      }
    },
    markAsFavorite: (state, action) => {
      const emailId = action.payload;
      const email = state.emailList.find((email) => email.id === emailId);
      if (email) {
        email.isFavorite = true;
      }
    },
    markAsNotFavorite: (state, action) => {
      const emailId = action.payload;
      const email = state.emailList.find((email) => email.id === emailId);
      if (email) {
        email.isFavorite = false;
      }
    },
  },
});

export const {
  setEmailList,
  selectEmail,
  markAsRead,
  markAsUnread,
  markAsFavorite,
  markAsNotFavorite,
} = emailSlice.actions;
export default emailSlice.reducer;
