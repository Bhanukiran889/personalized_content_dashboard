import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './features/preferences/preferencesSlice';
import contentReducer from './features/content/contentSlice'; // Assuming you have a content slice

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    content: contentReducer, // Add your content slice here
    
    // Add other reducers here as needed
  },
  // Optional: Add middleware, devtools config, etc.
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
