import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';


const PostAuthor = ({ userId }) => {

    const users = useSelector(selectAllUsers);

    const author = useMemo(()=> users.find(user=> user.id === userId),[userId, users])

  return (<>
    <span>by {author ? author.name : 'Unknown author'}</span>
  </>
  )
}

export default PostAuthor