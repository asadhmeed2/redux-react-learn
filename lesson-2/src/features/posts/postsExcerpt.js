import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {Link} from "react-router-dom";
import './posts.style.css';


const postsExcerpt = ({post}) => {
  return (
    <article className='post'>
            <h3 className='post-title'>{post?.title}</h3>
            <p className='post-content'>{post?.body.substring(0,75)}...</p>
            <p className ='postCredits'>
                <div>
                <Link to={`post/${post.id}`}>View Post</Link>
                </div>
                <PostAuthor userId = { post.userId }/> 
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
  )
}

export default postsExcerpt