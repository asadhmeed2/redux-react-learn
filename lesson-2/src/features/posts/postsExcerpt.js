import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"

import './posts.style.css'


const postsExcerpt = ({post}) => {
  return (
    <article className='post'>
            <h3 className='post-title'>{post?.title}</h3>
            <p className='post-content'>{post?.body.substring(0,100)}</p>
            <p className ='postCredits'>
                <PostAuthor userId = { post.userId }/> 
                <TimeAgo timestamp={post.data}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
  )
}

export default postsExcerpt