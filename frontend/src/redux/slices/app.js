import { createSlice } from "@reduxjs/toolkit";

import { dispatch } from "../store";

const initialState = {
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  snackbar : {
    open : null,
    message : null,
    severity : null,
  }
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle Sidebar
    toggleSideBar(state, action) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    openSnackbar(state, action){
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
    closeSnackbar(state, action){
      state.snackbar.open = false;
      state.snackbar.message = null;
      state.snackbar.severity = null;
    }
  },
});

// Reducer
export default slice.reducer;

export function ToggleSidebar() {
  return async () => {
    dispatch(slice.actions.toggleSideBar());
  };
}
export function UpdateSidebarType(type) {
  return async () => {
    dispatch(slice.actions.updateSideBarType({ type }));
  };
}

export function showSnackbar({severity, message}) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({
      message,
      severity,
    }))

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 4000)
  }
}


export function closeSnackbar(){
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
  }
}