import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload)
        },
        updatePost: (state, action) => {
            state.posts = state.posts.map(post => post.$id === action.payload.$id ? action.payload : post)
        }
    }
})

export const { addPost, setPosts, removePost, updatePost } = postSlice.actions;

export default postSlice.reducer;
