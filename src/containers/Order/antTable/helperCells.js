import React from 'react';
import ImageCellView from './imageCell';
import Select from '../../../components/uielements/select';
import { Input } from 'antd';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const ImageCell = src => <ImageCellView src={src} />;
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const TextCell = text => <p>{text}</p>;

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.cacheValue = this.props.value;
    this.state = {
      value: this.props.value,
      editable: this.props.editable || false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.cacheValue, this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue, this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target!==undefined ? e.target.value : e;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    const { textAlign, isSelectCell, valuesSelectCell } = this.props;
    return (
      <div>
        { editable ?
          <div>
            { isSelectCell===true ? 
              <Select size="small" value={value} style={{ textAlign:textAlign }} onChange={e => this.handleChange(e)}>
                { valuesSelectCell.map((val, index) => 
                  <Select.Option key={index} value={val}>{val}</Select.Option>
                  )
                }                
              </Select>
              :
              <Input
                size="small"
                value={value}
                onChange={e => this.handleChange(e)}
                style={{textAlign: textAlign}}
              />
            }
          </div>
          :
          <div className="editable-row-text">
            {value.toString() || ' '}
          </div>
        }
      </div>
    );
  }
}


export { DateCell, ImageCell, LinkCell, TextCell, EditableCell };
