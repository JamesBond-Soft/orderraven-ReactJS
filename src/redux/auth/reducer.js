import { Map } from 'immutable';
import { getToken, setToken, clearToken } from '../../helpers/utility';
import { getUserInfo, setUserInfo, clearUserInfo } from '../../helpers/utility';
import actions from './actions';
import { siteConfig } from '../../config.js';

const initState = new Map({
  idToken: null,
  avatarUrl: siteConfig.defaultAvatar,
  userInfo: {}
});

export default function authReducer(
  state = initState.merge(getToken(), getUserInfo()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      setToken(action.user.email);
      state = state.set('idToken', action.user.email);
      if (action.user.avatar !== undefined && action.user.avatar !== "") {
        state = state.set('avatarUrl', action.user.avatar);
      }
      setUserInfo(action.user);
      state = state.set('userInfo', action.user);
      return state;
    case actions.LOGOUT:
      clearToken();
      clearUserInfo();
      return initState;
    default:
      return state;
  }
}
