import React, { Component } from 'react';
import Button from '../../../components/uielements/button';

/**
 * props: index, columnsKey, value, onClick(value, columnsKey, index)
 */
export default class OrderCell extends Component {

  constructor(props) {
    super(props);
    this.handleClickMinus = this.handleClickMinus.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.value = this.props.value;
  }

  componentWillReceiveProps(nextProps) {
    if (this.value !== nextProps.value)
      this.value = nextProps.value;
  }
  

  handleClickMinus() {
    if (this.value <= 0)
      return;
    this.value--;
    this.props.onClick(this.value, this.props.columnsKey, this.props.index);
  }

  handleClickPlus() {
    this.value++;
    this.props.onClick(this.value, this.props.columnsKey, this.props.index);
  }
  
  render() {
    return (
      <div>
        <Button type="dashed"
          shape="circle"
          icon="minus-circle"
          size="default"
          style={{marginRight:5}}
          onClick={this.handleClickMinus}
          disabled={(this.props.value <= 0 || this.props.isEditing) ? true : false} //Make btn disable while editing
        />
        <font size="4">{this.props.value}</font>
        <Button type="dashed"
          shape="circle"
          icon="plus-circle"
          size="default"
          style={{marginLeft:5}}
          onClick={this.handleClickPlus}
          disabled={this.props.isEditing ? true : false} //Make btn disable while editing
        />
      </div>
    );
  }
}
