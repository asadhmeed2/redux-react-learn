import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postsSlice';

import PostsExcerpt from "./postsExcerpt"


const PostsList= ()=>{
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(()=>{
        if(postsStatus === 'idle'){
            dispatch(fetchPosts())}
    },[postsStatus, dispatch])
    
    const orderedPosts = posts?.slice().sort((a,b)=> b.date.localeCompare(a.date))

    const renderPosts = orderedPosts.map(post =>(
        <PostsExcerpt post={post}/>
    ))


    return (
        <section>
            <h2>Posts</h2>
            {renderPosts}
        </section>
    )

}

export default PostsList;