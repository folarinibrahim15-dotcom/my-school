// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {

//     user: null,

//     isAuthenticated: false,

// };

// const authSlice = createSlice({

//     name: "auth",

//     initialState,

//     reducers: {

//         setCredentials: (state, action) => {

//             state.user = action.payload;

//             state.isAuthenticated = true;

//         },

//         logout: (state) => {

//             state.user = null;

//             state.isAuthenticated = false;

//         },

//     },

// });

// export const {

//     setCredentials,

//     logout,

// } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /*
    |--------------------------------------------------------------------------
    | Save Logged-in User
    |--------------------------------------------------------------------------
    */

    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    /*
    |--------------------------------------------------------------------------
    | Update User Information
    |--------------------------------------------------------------------------
    */

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    /*
    |--------------------------------------------------------------------------
    | Restore Session
    |--------------------------------------------------------------------------
    */

    restoreSession: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.user;
    },
  },
});

export const {
  setCredentials,
  updateUser,
  logout,
  restoreSession,
} = authSlice.actions;

export default authSlice.reducer;