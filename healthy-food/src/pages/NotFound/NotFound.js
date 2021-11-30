import React, { Component } from 'react';
import './NotFound.css';

class NotFound extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div  className="Page_NotFound">
        <h1>Página Não Encontrada</h1>
      </div>
    );
  }
}

export default NotFound;