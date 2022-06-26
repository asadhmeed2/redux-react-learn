import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor'
import './posts.style.css'
import TimeAgo from './TimeAgo';


const PostsList= ()=>{
    const posts = useSelector(selectAllPosts)
    
    const orderedPosts = posts.slice().sort((a,b)=> b.date.localeComare(a.date))

    const renderPosts = orderedPosts.map(post =>(
        <article key={post.id} className='post'>
            <h3 className='post-title'>{post?.title}</h3>
            <p className='post-content'>{post?.content.substring(0,100)}</p>
            <p className ='postCredits'>
                <PostAuthor userId = { post?.userId }/> 
                <TimeAgo timestamp={post.date}/>
            </p>
        </article>
    ))


    return (
        <section>
            <h2>Posts</h2>
            {renderPosts}
        </section>
    )

}

export default PostsList;