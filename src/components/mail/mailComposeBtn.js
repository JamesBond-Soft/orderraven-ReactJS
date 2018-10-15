import React, { Component } from 'react';
import IntlMessages from '../utility/intlMessages';

export default class ComposeBtn extends Component {
  render() {
    return (
      <div className="isoComposeBtnWrapper">
        <button
          type="button"
          onClick={event => {
            this.props.changeComposeMail(true);
            if (this.props.onDrawerClose) {
              this.props.onDrawerClose();
            }
          }}
        >
          <IntlMessages id="email.compose" />
        </button>
      </div>
    );
  }
}
