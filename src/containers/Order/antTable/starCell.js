import React, { Component } from 'react';

/**
 * props: index, columnsKey, isActive, onClick(isActive, columnsKey, index)
 */
export default class StarCell extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.isActive = this.props.isActive;
  }

  handleClick() {
    this.isActive = !this.isActive;
    this.props.onClick(this.isActive, this.props.columnsKey, this.props.index);
  }

  render() {
    const image = this.isActive ? "/images/star-red.png" : "/images/star-white.png";
    return (
      <a onClick={this.handleClick}>
        <img src={image} alt={image} width="20" />
      </a>
    );
  }
}
