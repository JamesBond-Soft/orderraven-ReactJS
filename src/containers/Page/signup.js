import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import authAction from '../../redux/auth/actions';
// import Auth0 from '../../helpers/auth0/index';
import FirebaseHelper from '../../helpers/firebase';
// import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import { notification, Spin } from 'antd';
import SignupForm from './SignupForm';


const { login_success } = authAction;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.refSignupForm = this.refSignupForm.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.state = {
      redirectToReferrer: false,
      loading: false
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
      this.setState({ redirectToReferrer: true });
    }
  }
  refSignupForm(form) {
    this.signupForm = form;
  }

  handleSignup(values) {
    this.setState({loading: true});
    FirebaseHelper.signup(
      values,
      function successCallback(userObject) {
        this.props.login_success(userObject);
        this.setState({loading: false});
        this.props.history.push('/dashboard');
      }.bind(this),
      function errorCallback(err) {
        notification['error']({
          message: "SignUp Error!",
          description: err.message
        });
        this.setState({loading: false});
      }.bind(this)
    );
  }
  
  render() {
    return (
      <div className="isoSignUpPage">
        <div className="isoSignUpContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <img src="/images/ORDER-RAVEN-3.png" alt="RAVEN" height="60" style={{marginTop:5}} />
            </Link>
          </div>

          <Spin spinning={this.state.loading} size="large" >
          <div className="isoSignUpForm">
            <SignupForm 
              ref={this.refSignupForm}
              onSubmit={this.handleSignup}
            />
            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper" style={{marginBottom:30}} >
              <Link to="/signin">
                <IntlMessages id="page.signUpAlreadyAccount" />
              </Link>
            </div>
          </div>
          </Spin>

        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }),
  { login_success }
)(SignUp);
