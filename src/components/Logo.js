import React, { Component } from 'react';
import './Logo.css';

class Logo extends Component {
  constructor(props) {
    super(props);

    this.handleReload = this.handleReload.bind(this);
  }

  handleReload(event) {
    event.preventDefault();
    window.location.reload();
  }

  render() {
    return <a href="" onClick={this.handleReload} className="logo hidden-mobile">say it!</a>;
  }
}

export default Logo;
