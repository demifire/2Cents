import React from 'react';
import './DraftComments.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const DraftComments = (props) => {
    // const match = props
    // console.log("whats the match", match)
    return props.draftComments.map(draftComment =>
        <div key={draftComment.id} className="comment-bubble">
            <p className="draftComment-body">{draftComment.body}</p>
            <Link to={`edit-comment/${draftComment.id}`}>
                <button className="editDraftCommentBtn" type="button">Edit Comment</button>
            </Link>
            <Link to="/user/profile">
                <button className="deleteDraftCommentBtn" type="button">Delete Comment</button>
            </Link>
        </div>
    )
}

export default DraftComments