import PostsList from './features/posts/PostsList';
import PostsForm from './features/posts/AddPostForm';
import './App.css';
import SinglePostPage from './features/posts/singlePostPage';
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import EditPostForm from './features/posts/EditPostForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<PostsList/>}/>
          <Route path="post">
            <Route index element={<PostsForm/>}/>
            <Route path=":postId" element={<SinglePostPage/>}/>
            <Route path="edit/:postId" element={<EditPostForm/>}/>
          </Route>
        </Route>
    </Routes>
  );
}

export default App;
