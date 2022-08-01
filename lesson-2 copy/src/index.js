import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { extendedApiSlice } from './features/posts/postsSlice';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { usersApiSlice } from './features/users/usersSlice';


store.dispatch(extendedApiSlice.endpoints.getPosts.initiate()); 
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ApiProvider api={extendedApiSlice}>
            <Router>
                <Routes>
                    <Route path={'/*'} element={<App/>}/>
                </Routes>
            </Router>
        </ApiProvider>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
