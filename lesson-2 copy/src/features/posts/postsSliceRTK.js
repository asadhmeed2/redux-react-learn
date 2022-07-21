

//RTK api
import { 
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';

//RTK api
import {apiSlice} from '../api/apiSlice'
import { sub } from 'date-fns';


// part of the state normalization solution
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

//RTK api
const initialState =postsAdapter.getInitialState()


export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getPosts: builder.query({
            query: ( ) => '/posts',
            transformResponse : responseData =>{
                let min =1;
                const loadedPosts = responseData.map(post =>{
                    if(!post?.date) post.date=sub(new Date(),{minutes: min++}).toISOString();
                    if(!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                    return post;
                })
                return postsAdapter.setAll(initialState,loadedPosts)
            },
            providesTags: (result,error,arg )=>[
                {type: 'Post',id:'LIST'},
                ...result.ids.map(id =>({type:'Post',id}))
            ]
        }),
        getPostsByUserId: builder.query({
            queery: id=> `/posts/?userId=${id}`,
            initialPosttransformResponse: responseData =>{
                let min =1;
                const loadedPosts = responseData.map(post =>{
                    if(!post?.date) 
                    post.date = sub(new Date(),{minutes:min++}).toISOString();
                    if(!post?.reactions) post.reactions ={
                        thumbsUp:0,
                        wow:0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                    return post;
                })
                return postsAdapter.setAll(initialState,loadedPosts)
            },
            providesTags: (result, error ,arg)=>{
                console.log(result);
                return [
                    ...result.ids.map(id=>({ type:'Post', id }))
                ]
            }
        })
    })
})

export const { 
    useGetPostsQuery,
    useGetPostsByUserIdQuery, 
} =extendedApiSlice

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data,
)

 // part of the state normalization solution
 export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
 } = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)




