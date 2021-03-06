import {
  configureStore,
  combineReducers,
  createReducer,
} from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userId: null,
  userPosts: [],
  userAvatar: null,
};

const reducer = {
  CURRENT_USER: (state, { payload }) => ({
    ...state,
    userName: payload.userName,
    userId: payload.userId,
    userPosts: payload.userPosts,
    userAvatar: payload.userAvatar,
  }),
  USER_SIGNED_OUT: () => initialState,
};

const user = createReducer(initialState, reducer);

const rootReducer = combineReducers({
  user: user,
});

export const store = configureStore({
  reducer: rootReducer,
});
