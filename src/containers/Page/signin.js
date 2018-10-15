import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authAction from '../../redux/auth/actions';
import FirebaseHelper from '../../helpers/firebase';
import SigninForm from './SigninForm';
import { notification, Spin } from 'antd';

const { login_success } = authAction;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      redirectToReferrer: false,
      loading: false
    };
  }

  //
  // test
  //
  
  // fakeDataByLocation = [
  //   {
  //     products: [
  //       { name: 'NNs', key: 123 },
  //       { name: 'NNs', key: 456 },
  //       { name: 'NNs', key: 444 },
  //       { name: 'NNs', key: 226 },
  //       { name: 'NNs', key: 678 },
  //     ],
  //     products_sort: [444,226,123]
  //   }
  // ];
  // arrangeLocationProducts(itemOfDataByLocation) {
  //   let items = itemOfDataByLocation.products;
  //   let sorting = itemOfDataByLocation.products_sort;
  //   let result = [];
  //   sorting.forEach(uuid => {
  //     var found = false;
  //     items = items.filter(product => {
  //       if(!found && product.key === uuid) {
  //         result.push(product);
  //         found = true;
  //         return false;
  //       } else 
  //         return true;
  //     });
  //   });
  //   console.log('result = ', result);
  //   console.log('items = ', items);
  // }
  // componentWillMount() {
  //   this.arrangeLocationProducts(this.fakeDataByLocation[0]);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
  //     this.setState({ redirectToReferrer: true });
  //   }
  // }

  /**
   * Signin Handler :
   * 
   * @param {Object} values : { email, password }
   * @param {bool} remember : true or false
   * @memberof SignIn
   */
  handleLogin(values, remember) {
    this.setState({loading: true});
    FirebaseHelper.login(
      values,
      remember,
      function successCallback(userObject) {
        this.props.login_success(userObject);
        this.setState({loading: false});
        this.props.history.push('/dashboard');
      }.bind(this),
      function errorCallback(err) {
        notification['error']({
          message: "Login Error!",
          description: err.message
        });
        this.setState({loading: false});
      }.bind(this)
    );
  }

  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className="isoSignInPage">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">
              <img src="/images/ORDER-RAVEN-3.png" alt="RAVEN" height="60" style={{marginTop:5}} />
            </Link>
          </div>

          <Spin spinning={this.state.loading} size="large" >
          <div className="isoSignInForm">
            
            <SigninForm 
              onSubmit={this.handleLogin}
            />

            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                Forgot password?
              </Link>
              <Link to="/signup">
                Create an account
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
)(SignIn);
