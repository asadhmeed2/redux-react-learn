

//RTK api
import { 
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';

//RTK api
import {apiSlice} from '../api/apiSlice'
import { sub } from 'date-fns';

// normal Redux api calls
// import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// part of the state normalization solution
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

//RTK api
const initialState =postsAdapter.getInitialState()


export const extendedApiSlice = apiSlice.injectEndpoints({})

 // part of the state normalization solution
 export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
 } = postsAdapter.getSelectors(state =>  state.posts)

// export const selectAllPosts = (state) => state.posts.posts;
// export const getPostById =(state,postId)=> state.posts.posts.find(post=> post.id === postId);


export const getPostsError = (state) => state.posts.error;
export const getPostsStatus = (state) => state.posts.status;
export const getCount = (state) => state.posts.count;


export const selectPostsByUser =createSelector(
    [selectAllPosts,(state,userId)=>userId],
    (posts,userId)=> posts.filter(post => post.userId === Number(userId))
)



export const { reactionAdded, increaseCount } = postsSlice.actions; 

export default postsSlice.reducer;