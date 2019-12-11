import React, { Component } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Link } from '@reach/router';

class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;

    return (
      <nav className="grid-nav">
        <Link to="/" className="navbar-brand text-center">
          Fat-cat.io
        </Link>
      </nav>
    );
  }
}

export default Navigation;
