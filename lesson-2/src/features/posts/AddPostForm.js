import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { postAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

import './posts.style.css'

const AddPostForm = () => {
    const despatch = useDispatch();

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [userId,setUserId] = useState('');
    
    const users = useSelector(selectAllUsers)

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const onSaveHandler = () =>{
       title.length && content.length && userId && despatch(postAdded( title, content, userId ));
       setTitle('');
       setContent('');
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value ={user.id}>
            {user.name}
        </option>
    ))

    return (<section>
            <h2>Add a New Post</h2>
            <form className='post-form'>
                <label htmlFor='postTitle'>Post Title</label>
                <input type='text' name='postTitle' id="postTitle" value={title} onChange={onTitleChanged}/>

                <label htmlFor ='postAuthor'>Author</label>
                <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
                    <option value=''></option>
                    {usersOptions}
                </select>

                <label htmlFor='postContent'>Content</label>
                <textarea name='postContent' id='postContent' value = {content} onChange={onContentChanged}/>

                <button type='button' onClick={onSaveHandler}>Save Post</button>
            </form>
    </section>
    )
}

export default AddPostForm;