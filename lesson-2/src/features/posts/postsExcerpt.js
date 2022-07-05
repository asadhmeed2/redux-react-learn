import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import {Link} from "react-router-dom";
import './posts.style.css';


const postsExcerpt = ({post}) => {
  return (
    <article className='post'>
            <h2 className='post-title'>{post?.title}</h2>
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

export default postsExcerpt;

//to solve the problem of rerender all the post when the user press a reation button, we use on of two solutions
/**\
 * A. react solution
 *  1.import react
 *    inport React from 'react'
 *  2.change const to let of the component 
 *    const postsExcerpt = ({post}) -> let postsExcerpt=({post})
 *  3.
 *    PostssExcerpt = rReact.memo(PostsExcerpt)
 * 
 * this solution well reander the component only when the prop data change
 */