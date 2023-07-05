import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  snackbar : {
    open : null,
    message : null,
    severity : null,
  },
  users: [],
  friends: [],
  friendRequests: [],
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
    },

    updateUsers(state, action){
      state.users = action.payload.users;
    },

    updateFriends(state, action){
      state.friends = action.payload.friends;
    },

    updateFriendRequests(state, action){
      state.friendRequests = action.payload.requests;
    },
  },
});

export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    }),then((respoense) => {
      console.log(response);
      dispatch(slice.actions.updateUsers({users: response.data.data}))
    }).catch((error) => {
      console.log(error);
    });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friends", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    }).then((respoense) => {
      console.log(response);
      dispatch(slice.actions.updateUsers({friends: response.data.data}))
    }).catch((error) => {
      console.log(error);
    });
  };
};

export const FetchRequest = () => {
  return async (dispatch, getState) => {
    await axios.get("/user/get-friend-requests", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    }).then((respoense) => {
      console.log(response);
      dispatch(slice.actions.updateFriendRequest({request: response.data.data}))
    }).catch((error) => {
      console.log(error);
    });
  };
};

// Reducer
export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSideBar());
  };
}
export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
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