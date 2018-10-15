import React, { Component } from 'react';
import { connect } from 'react-redux';
import authAction from '../../redux/auth/actions';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Input from '../../components/uielements/input';
import { Col, notification, Checkbox } from 'antd';
import Button from '../../components/uielements/button';
import FirebaseHelper from '../../helpers/firebase';

const InputGroup = Input.Group;
const { login_success, logout } = authAction;

class Settings extends Component {

  handleUpdate = () => {
    /*
    this.name,restaurant,email,phone, old_password,new_password,confirm_password
    */
    const userInfo = this.props.userInfo;
    var isChanged = false;
    var emailChanged = false;
    var newPassword = undefined;
    if (this.name) { isChanged=true; userInfo.name=this.name; }
    if (this.restaurant) { isChanged=true; userInfo.restaurant=this.restaurant; }
    if (this.email) { isChanged=true; userInfo.email=this.email; emailChanged=true; }
    if (this.cc !== userInfo.cc) { isChanged=true;userInfo.cc=this.cc; }
    if (this.phone) { isChanged=true; userInfo.phone=this.phone; }
    if (this.new_password) {
      isChanged=true;
      if (this.new_password !== this.confirm_password) {
        notification['warning']({
          message: 'New password and confirm are inconsist'
        });
        return;
      } else {
        newPassword = this.new_password;
      }
    }
    if (isChanged) {
      FirebaseHelper.updateUserInfo(userInfo, emailChanged, newPassword, (user) => {
        login_success(user);
        notification['success']({
          message: 'Success',
          description: 'Your profile has updated.'
        })
      }, (err) => {
        notification['error']({
          message: 'Updating Profile - Error',
          description: err.message
        })
      })
    }
  }

  render() {
    const { userInfo } = this.props;
    const inputGroupStyle = {display:"flex", alignItems:"center"};
    const labelStyle={width:160};
    const inputStyle={width:200};

    return (
      <LayoutWrapper>
        <PageHeader>SETTINGS</PageHeader>

            {/* Settings */}
            <Box>
              <font size="4">Settings</font>
              <br/><br/><br/>
              <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}><font>Your Name</font></Col>
                <Col style={inputStyle}><Input defaultValue={userInfo.name} onChange={e => this.name=e.target.value}/></Col>
              </InputGroup>
              <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}><font>Restaurant Name</font></Col>
                <Col style={inputStyle}><Input defaultValue={userInfo.restaurant} onChange={e => this.restaurant=e.target.value}/></Col>
              </InputGroup>
              <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}><font>From Email</font></Col>
                <Col style={inputStyle}><Input defaultValue={userInfo.email} onChange={e => this.email=e.target.value}/></Col>
              </InputGroup>
              <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}></Col>
                <Col style={inputStyle}><Checkbox defaultChecked={userInfo.cc} onChange={e => this.cc=e.target.checked}>cc myself on all email orders</Checkbox></Col>
              </InputGroup>
              <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}><font>From Phone</font></Col>
                <Col style={inputStyle}><Input defaultValue={userInfo.phone} onChange={e => this.phone=e.target.value}/></Col>
                {/* <Col style={{width:40}}><Input defaultValue=""/></Col>
                <Col style={{width:60}}><Input defaultValue=""/></Col>
                <Col style={{width:100}}><Input defaultValue=""/></Col> */}
              </InputGroup>
            </Box>

            {/* Reset Password */}
            <Box>
              <font size="4">Password Reset</font>
              <br/><br/><br/>
              {/* <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}><font>Old Password</font></Col>
                <Col style={inputStyle}><Input type="password" onChange={e => this.old_password=e.target.value}/></Col>
              </InputGroup> */}
              <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}><font>New Password</font></Col>
                <Col style={inputStyle}><Input type="password" onChange={e => this.new_password=e.target.value}/></Col>
              </InputGroup>
              <InputGroup style={inputGroupStyle}>
                <Col style={labelStyle}><font>Confirm Password</font></Col>
                <Col style={inputStyle}><Input type="password" onChange={e => this.confirm_password=e.target.value}/></Col>
              </InputGroup>
            </Box>

            {/* Update Button */}
            <Button onClick={this.handleUpdate.bind(this)} type="primary" style={{marginLeft:17, marginRight:17}}>Update</Button>

      </LayoutWrapper>
    );
  }
};

export default connect(state => ({
  avatarUrl: state.Auth.get('avatarUrl'),
  userInfo: state.Auth.get('userInfo')
}), { login_success, logout })(Settings);
