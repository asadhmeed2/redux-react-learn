import { useSelector } from 'react-redux';
import { useGetPostsQuery } from './postsSlice';
import PostsExcerpt from "./postsExcerpt"
import { selectPostIds } from './postsSlice';


const PostsList= ()=>{
    
    const {
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery()

    const orderedPostsIds = useSelector(selectPostIds)
    
    let content;
    if(isLoading){
        content =<p>"loading..."</p>
    }else if(isSuccess){
         // part of the state normalization solution
        content = orderedPostsIds.map(postId =><PostsExcerpt key={postId} postId={postId}/>)
        // const orderedPostes = posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
        // content = orderedPostes.map(post=> <PostsExcerpt key={post.id} post={post}/>)
    }else if(isError){
        content =<p>{error}</p>
    }


    return (
        <section className='content-container'>
            {content}
        </section>
    )

}

export default PostsList;