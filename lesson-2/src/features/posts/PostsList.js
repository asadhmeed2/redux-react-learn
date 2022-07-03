

import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError } from './postsSlice';

import PostsExcerpt from "./postsExcerpt"


const PostsList= ()=>{

    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
    
    let content;
    if(postsStatus === 'loading'){
        content =<p>"loading..."</p>
    }else if(postsStatus === 'succeeded'){
        const orderedPostes = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
        content = orderedPostes.map(post=> <PostsExcerpt key={post.id} post={post}/>)
    }else if(postsStatus === 'failed'){
        content =<p>{error}</p>
    }


    return (
        <section className='content-container'>
            {content}
        </section>
    )

}

export default PostsList;