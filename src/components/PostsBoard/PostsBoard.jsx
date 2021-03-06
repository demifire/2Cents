import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './PostsBoard.css';
import { connect } from 'react-redux';
import Posts from './posts/posts.jsx';

//Actions
import { getPostandCommentsById, getAllPosts, archive } from '../../actions/actions.js';

class PostsBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.dispatch(getAllPosts())
  }

  getPostandCommentsById = (props) => {
    this.props.dispatch(
      getPostandCommentsById(props),
    )
  }

  checkForParentComponent = () => {
    if (this.props.auth) {
      return false;
    } else {
      return true;
    }
  }

  archive = (id) => {
    this.props.dispatch(
      archive(id)
    )
  }

  render() {
    console.log(this.checkForParentComponent(), 'check for parent')
    const auth = this.props.auth;
    const { items, user } = this.props;
    const match = this.props.match.path;
    console.log(this.props, 'what about poastboard?')
    return (
      <div className="postsBoard">

        {!this.checkForParentComponent() && !auth.isAuthenticated() && <div id="postings-section">
          <div id="postings-section-title">All Postings</div>
          <Posts props={this.props} auth={auth} match={match} items={items} user={user} archive={this.archive} getPostandCommentsById={this.getPostandCommentsById} />
        </div>
        }

        {auth.isAuthenticated() && <div id="postings-section-auth">
          <div id="postings-section-title">All Postings</div>
          <Posts props={this.props} auth={auth} match={match} items={items} user={user} archive={this.archive} getPostandCommentsById={this.getPostandCommentsById} />
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(PostsBoard);