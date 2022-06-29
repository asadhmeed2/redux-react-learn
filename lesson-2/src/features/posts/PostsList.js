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
    
    let content;
    if(postsStatus === 'loading'){
        content =<p>"loading..."</p>
    }else if(postsStatus === 'succeeded'){
        console.log(posts.slice());
        const orderedPostes = posts.slice().sort((a,b)=>b.data.localeCompare(a.data))
        content = orderedPostes.map(post=> <PostsExcerpt key={post.id} post={post}/>)
    }else if(postsStatus === 'failed'){
        content =<p>{error}</p>
    }


    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )

}

export default PostsList;