const authActons = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  login_success: (userObject) => {
    return {
      type: authActons.LOGIN_SUCCESS,
      user: userObject
    }
  },

  LOGOUT: 'LOGOUT',
  logout: () => {
    return {
      type: authActons.LOGOUT
    }
  }
};
export default authActons;
