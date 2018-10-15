import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, notification } from 'antd';
import IntlMessages from '../../components/utility/intlMessages';
import FirebaseHelper from '../../helpers/firebase';

class ForgotPassword extends React.Component {
  handleForgotPassword() {
    FirebaseHelper.resetPassword(
      this.inputEmail,
      function successCallback(value) {
        notification['success']({
          message: 'Email sent for new password!'
        });
        this.props.history.push('/');
      }.bind(this),
      function errorCallback(err) {
        notification['error']({
          message: 'Reset Password Error!',
          description: err.message
        });
      }
    );
  }

  handleChange(value) {
    this.email = value;
  }

  render() {
    return (
      <div className="isoForgotPassPage">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <IntlMessages id="page.forgetPassTitle" />
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              <IntlMessages id="page.forgetPassSubTitle" />
            </h3>
            <p>
              <IntlMessages id="page.forgetPassDescription" />
            </p>
          </div>

          <div className="isoForgotPassForm">
            <div className="isoInputWrapper">
              <Input onChange={e => this.inputEmail = e.target.value} size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Button type="primary" onClick={this.handleForgotPassword.bind(this)}>
                <IntlMessages id="page.sendRequest" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
