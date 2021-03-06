import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './posts.css';

const Posts = (props) => {
    let match = props.match;
    if (match === '/') {
        match = '';
    } else {
        match = '/dashboard';
    }
    console.log(props, 'what is coming through at this point');

    return props.items.slice(0).reverse().map(post =>
        <div key={post.id} className="posting" onClick={() => props.getPostandCommentsById(post.id)}>
            <div className="single-posting-container">
                <div className="userIcon">
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />

                    <i className="far fa-user-circle fa-2x"></i>
                </div>

                <div className="postSubject-container">
                    <p className="postSubject">{post.subject}</p>
                </div>

                <Link className="viewPosting-Link" key={post.id} to={`${match}/post/${post.id}`}>
                    <div className="viewPosting">view posting</div>
                </Link>

                {props.auth.isAuthenticated() && (props.user.id === post.user_id) && <button className="archiveBtn" onClick={() => props.archive(post.id)}>archive</button>}
            </div>
        </div>
    )
}

export default Posts