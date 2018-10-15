import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '../uielements/popover';
import authAction from '../../redux/auth/actions';
import { Link } from 'react-router-dom';

const { logout } = authAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false,
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const content = (
      <div className="isoUserDropdownContent">
        <a className="isoDropdownLink"><Link to="/dashboard/settings" onClick={this.hide}>Settings</Link></a>
        <a className="isoDropdownLink" onClick={this.props.logout}>Logout</a>
      </div>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        overlayClassName="isoUserDropdown"
        arrowPointAtCenter={true}
      >
        {/* <div className="isoImgWrapper"> */}
        <div>
          <h3>{this.props.userInfo.name}</h3>
          {/* <span className="userActivity online" /> */}
        </div>
      </Popover>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.Auth.get('userInfo')
  }
}

export default connect(mapStateToProps, { logout })(TopbarUser);
