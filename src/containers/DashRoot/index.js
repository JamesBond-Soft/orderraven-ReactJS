import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class DashRoot extends Component {
  render() {
    return (
      <Redirect to={{pathname: '/dashboard/order'}} />
    )
  }
}
