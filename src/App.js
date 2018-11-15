//CLIENT - UNAUTHENTICATED USER VIEW

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//Import JSX component files
import PostsBoard from './components/PostsBoard/PostsBoard.jsx';
import PostDetail from './components/PostDetail/PostDetail.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import NewRequest from './components/forms/NewRequest.jsx';

//Setup for redux
import { connect } from 'react-redux';
import { getAllPosts } from './actions/actions.js'




class App extends Component {
  constructor(props) {
    super(props);
  }

  //~~~~~~~~Lifecycle Methods~~~~~~~~~~~//
  componentDidMount() {
    console.log('App.js mounted')
    this.props.dispatch(getAllPosts())
  }

  getAllPosts() {
    console.log("App.js - Setting state back to all");
    this.props.dispatch(
      getAllPosts()
    )
  }

  //~~~~~~~~App Component Methods~~~~~~~~~//
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  getGreeting() {
    this.props.auth.getGreeting();
  }

  //~~~~~~~~App Component - RENDER~~~~~~~~~//
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log("isAuthenticated:", isAuthenticated());
    console.log(this.props, 'Props');

    return (
      <div className="App">
        <div>{console.log(this.props, 'hello?')}</div>
        <div></div>
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Kodchasan|Quicksand|Unica+One" rel="stylesheet" />

        {/* Routing Links & Routes */}
        {/* <Router>
          <div id="navbar">
            <Header>
              <div id="linkBtns">
                {isAuthenticated() &&
                  <p id="user-greeting">Hello, <Greeting /></p>}

                <LinkButton to={"/"} title={"Home"} onClick={this.goTo.bind(this, 'home')} />

                {!isAuthenticated() && <button id="loginBtn" onClick={this.login.bind(this)}>Login</button>}

                {isAuthenticated() &&
                  <LinkButton to={"/user/profile"} title={"My Profile"} onClick={this.goTo.bind(this, 'user/profile')} />}

                {isAuthenticated() &&
                  <button id="logoutBtn" onClick={this.logout.bind(this)}>Log Out</button>}


              </div>
            </Header>
          </div>
        </Router> */}

        <footer>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous">
          </link>
          <i className="fab fa-github-alt fa-2x">
            <a href="https://github.com/maymc/consume-more-stuff" target="_blank"> Visit our Github!</a>
          </i>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(App);
