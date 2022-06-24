import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';
import './posts.style.css'


const PostsList= ()=>{
    const posts = useSelector(selectAllPosts)

    const renderPosts = posts.map(post =>(
        <article key={post.id} className='post'>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-content'>{post.content.substring(0,100)}</p>
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