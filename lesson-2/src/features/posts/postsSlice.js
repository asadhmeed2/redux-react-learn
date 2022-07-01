import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState ={
    posts:[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return initialPost; 
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action)=> {
                state.posts.push(action.payload)
            },
            prepare: (title, content,userId)=>{
                return {
                    payload: {
                        id: nanoid(),
                        title, 
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            wow: 0,
                            heart: 0,
                            coffee: 0,
                            rocket: 0,
                            thumbsUp: 0,
                        }
                    }
                }
            }
    },
    reactionAdded : (state,action)=>{
        const { postId ,reaction } =action.payload;
        const existingPsot = state.posts.find(post=> post.id === postId)
        if (existingPsot){
            existingPsot.reactions[reaction]++;
        }
    },
},
extraReducers: ( builder )=>{
    builder.addCase(fetchPosts.pending,(state,action)=>{
        state.status = 'loading'
    })
    .addCase(fetchPosts.fulfilled,(state,action)=>{
        state.status = 'succeeded'
        let min = 1;
        const loadedPosts = action.payload.map(post =>{
            post.date =sub(new Date(),{minutes:min++}).toISOString()
            post.reactions = {
                wow: 0,
                heart: 0,
                coffee: 0,
                rocket: 0,
                thumbsUp: 0,
            }
            return post;
        }) 
        // Add any getched posts to array
        state.posts = state.posts.concat(loadedPosts)
    })
    .addCase(fetchPosts.rejected, (state,action)=>{
        state.status = 'failed'
        state.error = action.error.message
    })
    .addCase(addNewPost.fulfilled,(state,action)=>{
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
            wow: 0,
            heart: 0,
            coffee: 0,
            rocket: 0,
            thumbsUp: 0,
        }
        console.log(action.payload);
        state.posts.push(action.payload)
    })
}
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const getPostById =(state,postId)=>{
    return state.posts.posts.find(post=> post.id === postId)
}


export const { postAdded, reactionAdded } = postsSlice.actions; 

export default postsSlice.reducer;