import { configureStore } from '@reduxjs/toolkit'
import { userSlice, topicSlice, commentsSlice, regionSlice, matchSlice, friendSlice } from './slices'

// Add slices to reducer here
export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    topicsReducer: topicSlice.reducer,
    commentsReducer: commentsSlice.reducer,
    regionReducer: regionSlice.reducer,
    matchReducer: matchSlice.reducer,
    friendsReducer: friendSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch