import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {

    return (
      <footer>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous">
        </link>

        <a href="https://github.com/maymc/consume-more-stuff" target="_blank">
          <i className="fab fa-github-alt fa-2x"></i>
        </a>
      </footer>
    );
  }
}

export default Footer;
