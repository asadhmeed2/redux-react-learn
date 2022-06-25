import PostsList from './features/posts/PostsList';
import PostsForm from './features/posts/AddPostForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PostsForm/>
        <PostsList/>
      </header>
    </div>
  );
}

export default App;
